export const actionTypes = {
    CHANGE_SCREEN: 'CHANGE_SCREEN',
    SET_SELECTED_CIRCUIT: 'SET_SELECTED_CIRCUIT',
    SET_SELECTED_PLAYERS: 'SET_SELECTED_PLAYERS',
    REMOVE_PLAYER: 'REMOVE_PLAYER',
};
export const changeScreen = (screenId) => {
    return {
        type: actionTypes.CHANGE_SCREEN,
        screenId,
    };
};
export const setSelectedCircuit = (circuitId) => {
    return {
        type: actionTypes.SET_SELECTED_CIRCUIT,
        circuitId,
    };
};

export const setSelectedPlayers = (players, playerOrder) => {
    return {
        type: actionTypes.SET_SELECTED_PLAYERS,
        players,
        playerOrder,
    };
};

export const removePlayer = (playerId) => {
    return {
        type: actionTypes.REMOVE_PLAYER,
        playerId,
    };
};
