import { getUniqueIdString as id } from 'utils/getUniqueIdString';

export const actionTypes = {
    MOVE_TO: id('MOVE_TO'),
    SET_PLAYERS: id('SET_PLAYERS'),
    NOTIFY_COLLISION: id('NOTIFY_COLLISION'),
    REDUCE_GROUNDED: id('REDUCE_GROUNDED'),
    NOTIFY_VISITED_CHECKPOINTS: id('NOTIFY_VISITED_CHECKPOINTS'),
};

export const moveTo = (playerId, position, timePassed) => {
    return {
        type: actionTypes.MOVE_TO,
        playerId,
        position,
        timePassed,
    };
};

export const notifyCollision = (playerId, speed, timePassed) => {
    return {
        type: actionTypes.NOTIFY_COLLISION,
        playerId,
        speed,
        timePassed,
    };
};

export const setPlayers = (players) => {
    return {
        type: actionTypes.SET_PLAYERS,
        players,
    };
};

export const reduceGrounded = (playerId) => {
    return {
        type: actionTypes.REDUCE_GROUNDED,
        playerId,
    };
};

export const notifyVisitedCheckpoints = (playerId, newCheckpointIndexes) => {
    return {
        type: actionTypes.NOTIFY_VISITED_CHECKPOINTS,
        playerId,
        newCheckpointIndexes,
    };
};
