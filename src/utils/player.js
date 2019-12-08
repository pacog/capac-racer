import { substract, magnitude, distance } from 'utils/vector2d';

export const movePlayerTo = (player, position, timePassed) => {
    const newSpeed = substract(position, player.position);
    const speedMagnitude = magnitude(newSpeed);

    return {
        ...player,
        position,
        speed: newSpeed,
        prevPositions: player.prevPositions.concat(position),
        turnsSpent: player.turnsSpent + 1,
        maxSpeed: Math.max(speedMagnitude, player.maxSpeed),
        realTimeUsed: player.realTimeUsed + timePassed,
    };
};

export const crashPlayer = (player, speed, timePassed) => {
    const newSpeed = { x: 0, y: 0 };
    const turnsGrounded = Math.floor(speed / 3);
    return {
        ...player,
        speed: newSpeed,
        turnsGrounded,
        crashes: player.crashes + 1,
        turnsSpent: player.turnsSpent + 1,
        realTimeUsed: player.realTimeUsed + timePassed,
    };
};

export const reduceGrounded = (player) => {
    return {
        ...player,
        turnsGrounded: Math.max(0, player.turnsGrounded - 1),
        turnsSpent: player.turnsSpent + 1,
    };
};

export const addCheckpoints = (player, newIndexes) => {
    const newCheckpoints = player.checkpointsPassed.slice();
    newIndexes.forEach((newIndex) => {
        newCheckpoints[newIndex] = true;
    });
    return {
        ...player,
        checkpointsPassed: newCheckpoints,
    };
};

export const doesPlayerHaveRepeatedPositions = (player) => {
    const positionHash = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const position of player.prevPositions) {
        const id = `${position.x}_${position.y}`;
        if (positionHash[id]) {
            return true;
        }
        positionHash[id] = true;
    }
    return false;
};

export const getAverageSpeed = (player) => {
    if (!player.prevPositions.length) {
        return 0;
    }
    let totalDistance = 0;
    for (let i = 0; i < player.prevPositions.length - 1; i += 1) {
        const point = player.prevPositions[i];
        const nextPoint = player.prevPositions[i + 1];
        totalDistance += distance(point, nextPoint);
    }
    return totalDistance / player.prevPositions.length;
};

export const getCheckpointsPassed = (player) => {
    let result = 0;
    for (let i = 0; i < player.checkpointsPassed.length - 1; i += 1) {
        if (!player.checkpointsPassed[i]) {
            break;
        }
        result += 1;
    }
    return result;
};

export const hasPlayerFinishedRace = (player) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const checkpoint of player.checkpointsPassed) {
        if (!checkpoint) {
            return false;
        }
    }
    return true;
};
