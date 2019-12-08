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

export const createFromConfig = (config) => {
    const result = {
        ...config,
    };

    return loadImage(config.collisionImg)
        .then((collisionImg) => {
            result.width = collisionImg.width;
            result.height = collisionImg.height;
            return createPixelGetterFromImage(collisionImg);
        })
        .then((collisionPixelGetter) => {
            result.collisionPixelGetter = collisionPixelGetter;

            return Promise.all(
                config.checkpoints.map((checkpointImg) =>
                    loadImage(checkpointImg),
                ),
            );
        })
        .then((loadedCheckpointImages) => {
            return Promise.all(
                loadedCheckpointImages.map((checkpointImage) =>
                    createPixelGetterFromImage(checkpointImage),
                ),
            );
        })
        .then((checkpointPixelGetters) => {
            result.checkpointPixelGetters = checkpointPixelGetters;
            result.centerOfCheckpoints = checkpointPixelGetters.map((cp) =>
                getCenterOfCheckpoint(cp),
            );
            return result;
        });
};

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

export const getMaxCheckpointDistance = (circuit) => {
    const checkpoints = circuit.centerOfCheckpoints;
    const distances = checkpoints.map((cp, index) => {
        return distance(cp, checkpoints[(index + 1) % checkpoints.length]);
    });
    return distances.reduce((acc, eachDistance) => {
        return Math.max(acc, eachDistance);
    }, 0);
};

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
