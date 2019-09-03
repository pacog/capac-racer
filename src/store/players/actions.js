export const actionTypes = {
    MOVE_TO: 'MOVE_TO',
    SET_PLAYERS: 'SET_PLAYERS',
    NOTIFY_COLLISION: 'NOTIFY_COLLISION',
    REDUCE_GROUNDED: 'REDUCE_GROUNDED',
};

export const moveTo = (playerId, position) => {
    return {
        type: actionTypes.MOVE_TO,
        playerId,
        position,
    };
};

export const notifyCollision = (playerId, speed) => {
    return {
        type: actionTypes.NOTIFY_COLLISION,
        playerId,
        speed,
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
