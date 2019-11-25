export const actionTypes = {
    MOVE_TO: 'MOVE_TO',
    SET_PLAYERS: 'SET_PLAYERS',
    NOTIFY_COLLISION: 'NOTIFY_COLLISION',
    REDUCE_GROUNDED: 'REDUCE_GROUNDED',
    NOTIFY_VISITED_CHECKPOINTS: 'NOTIFY_VISITED_CHECKPOINTS',
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
