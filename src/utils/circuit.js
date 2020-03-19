/* eslint-disable no-restricted-syntax */
import { loadImage } from 'utils/loadImage';
import { createFromImage as createPixelGetterFromImage } from 'utils/imgPixelGetter';
import {
    distance,
    add,
    scale,
    substract,
    round,
    isEqual,
} from 'utils/vector2d';
import { range } from 'utils/range';
import { hasContent } from 'utils/pixel';
import { getScreenCoordinates } from 'utils/screenUtils';

/**
 *
 * @param {CircuitConfig} config
 * @returns {Promise<Circuit>}
 */
export const createFromConfig = async (config) => {
    const collisionImg = await loadImage(config.collisionImg);
    const collisionPixelGetter = await createPixelGetterFromImage(collisionImg);
    const loadedCheckpointImages = await Promise.all(
        config.checkpoints.map((checkpointImg) => loadImage(checkpointImg)),
    );
    const checkpointPixelGetters = await Promise.all(
        loadedCheckpointImages.map((checkpointImage) =>
            createPixelGetterFromImage(checkpointImage),
        ),
    );
    return {
        ...config,
        width: collisionImg.width,
        height: collisionImg.height,
        collisionPixelGetter,
        checkpointPixelGetters,
        centerOfCheckpoints: checkpointPixelGetters.map(getCenterOfCheckpoint),
    };
};

/**
 *
 * @param {Line} line
 * @param {Circuit} circuit
 * @param {Point[]} otherPlayersPosition
 */
export const doesLineCollide = (line, circuit, otherPlayersPosition) => {
    const pixelsToCheck = getPixelsToCheck(line).map(round);
    if (
        doesAnyPixelCollideInImage(pixelsToCheck, circuit.collisionPixelGetter)
    ) {
        return true;
    }
    for (const pixelToCheck of pixelsToCheck) {
        // eslint-disable-next-line no-loop-func
        const collidesWithOtherPlayer = otherPlayersPosition.find((position) =>
            isEqual(position, pixelToCheck),
        );
        if (collidesWithOtherPlayer) {
            return true;
        }
    }
    return false;
};

/**
 * Checks if a player can move between two points. Will return false if it collides with the circuit or other players, true otherwise
 * @param {Object} params
 * @param {Point} params.from
 * @param {Point} params.to
 * @param {Circuit} params.circuit
 * @param {Player[]} params.otherPlayers
 * @param {number} params.zoom
 * @param {number} params.gridSize
 */
export const checkIfPlayerCanMove = ({
    from,
    to,
    circuit,
    otherPlayers,
    zoom,
    gridSize,
}) => {
    const movementLine = [
        getScreenCoordinates(from, gridSize, zoom),
        getScreenCoordinates(to, gridSize, zoom),
    ];
    const otherPlayersPosition = otherPlayers
        .map((player) => player.position)
        .map((position) => getScreenCoordinates(position, gridSize, zoom));

    return !doesLineCollide(movementLine, circuit, otherPlayersPosition);
};

/**
 * Gets the checkpoints visited in a line of movement.
 *
 * @param {Line} line
 * @param {Circuit} circuit
 * @returns {number[]} The indexes of checkpoints that have been visited
 */
export const getCheckpointsVisitedInLine = (line, circuit) => {
    const pixelsToCheck = getPixelsToCheck(line).map(round);
    return circuit.checkpointPixelGetters
        .map((checkpointPixelGetter) =>
            doesAnyPixelCollideInImage(pixelsToCheck, checkpointPixelGetter),
        )
        .map((doesItCollide, index) => ({ doesItCollide, index }))
        .filter(({ doesItCollide }) => !!doesItCollide)
        .map(({ index }) => index);
};

/**
 *
 * @param {Object} params
 * @param {Point} params.from
 * @param {Point} params.to
 * @param {Circuit} params.circuit
 * @param {number} params.zoom
 * @param {number} params.gridSize
 * @returns {number[]} The indexes of checkpoints that have been visited
 */
export const getCheckpointsInMovement = ({
    from,
    to,
    circuit,
    zoom,
    gridSize,
}) => {
    const movementLine = [
        getScreenCoordinates(from, gridSize, zoom),
        getScreenCoordinates(to, gridSize, zoom),
    ];
    return getCheckpointsVisitedInLine(movementLine, circuit);
};

/**
 * Gets the distance from a player to the next checkpoint
 * @param {Object} params
 * @param {Player} params.player
 * @param {Circuit} params.circuit
 * @param {number} params.gridSize
 * @param {number} params.zoom
 */
export const getDistanceToNextCheckpoint = ({
    player,
    circuit,
    gridSize,
    zoom,
}) => {
    for (let i = 0; i < player.checkpointsPassed.length; i += 1) {
        if (!player.checkpointsPassed[i]) {
            const playerPositionScreen = getScreenCoordinates(
                player.position,
                gridSize,
                zoom,
            );
            return distance(
                playerPositionScreen,
                circuit.centerOfCheckpoints[i],
            );
        }
    }
    // All have been visited, so no distance
    return 0;
};

/**
 * Gets the maximum distance between two consecutive checkpoints in a circuit
 * @param {Circuit} circuit
 */
export const getMaxCheckpointDistance = (circuit) => {
    const checkpoints = circuit.centerOfCheckpoints;
    const distances = checkpoints.map((cp, index) => {
        return distance(cp, checkpoints[(index + 1) % checkpoints.length]);
    });
    return distances.reduce((acc, eachDistance) => {
        return Math.max(acc, eachDistance);
    }, 0);
};

/**
 * @param {Point[]} pixelsToCheck
 * @param {PixelGetter} imagePixelGetter
 */
function doesAnyPixelCollideInImage(pixelsToCheck, imagePixelGetter) {
    for (const pixelToCheck of pixelsToCheck) {
        const pixelInCollisionMap = imagePixelGetter.getPixel(
            pixelToCheck.x,
            pixelToCheck.y,
        );
        if (hasContent(pixelInCollisionMap)) {
            return true;
        }
    }
    return false;
}

/**
 * @param {Line} line
 */
function getPixelsToCheck([start, end]) {
    const lineLength = distance(start, end);
    const nPixelsToCheck = Math.ceil(lineLength * 2);
    if (nPixelsToCheck < 2) {
        return [];
    }
    const diffVector = substract(end, start);
    const result = range(nPixelsToCheck).map((index) => {
        const factor = index / (nPixelsToCheck - 1);
        return add(start, scale(diffVector, factor));
    });

    return result;
}

/**
 * @param {PixelGetter} checkpoint
 * @returns {Point}
 */
function getCenterOfCheckpoint(checkpoint) {
    const pixelsToCheck = [];
    for (let i = 0; i < checkpoint.width; i += 1) {
        for (let j = 0; j < checkpoint.height; j += 1) {
            if (hasContent(checkpoint.getPixel(i, j))) {
                pixelsToCheck.push([i, j]);
            }
        }
    }
    if (!pixelsToCheck.length) {
        return null;
    }

    const resultArray = pixelsToCheck.reduce(
        (acc, pixel) => {
            return [
                acc[0] + pixel[0] / pixelsToCheck.length,
                acc[1] + pixel[1] / pixelsToCheck.length,
            ];
        },
        [0, 0],
    );

    return { x: resultArray[0], y: resultArray[1] };
}
