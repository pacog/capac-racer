export const actionTypes = {
    MOVE_TO: 'MOVE_TO',
    SET_PLAYERS: 'SET_PLAYERS',
};
export const moveTo = (playerId, position) => {
    return {
        type: actionTypes.MOVE_TO,
        playerId,
        position,
    };
};

export const setPlayers = (players) => {
    return {
        type: actionTypes.SET_PLAYERS,
        players,
    };
};
