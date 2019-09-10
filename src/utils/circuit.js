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
import { checkpointNamesToCheck } from 'constants/checkpoints';

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
                checkpointNamesToCheck.map((checkpointAttr) =>
                    loadImage(config[checkpointAttr]),
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
