export const actionTypes = {
    INIT_GAME: 'INIT_GAME',
    START_GAME: 'START_GAME',
    SET_GAME_STATE: 'SET_GAME_STATE',
    NEXT_TURN: 'NEXT_TURN',
    SET_CIRCUIT: 'SET_CIRCUIT',
};
export const initGame = (playerOrder, circuitInfo) => {
    return {
        type: actionTypes.INIT_GAME,
        playerOrder,
        circuitInfo,
    };
};

export const startGame = () => {
    return {
        type: actionTypes.START_GAME,
    };
};

export const setGameState = (newGameState) => {
    return {
        type: actionTypes.SET_GAME_STATE,
        newGameState,
    };
};

export const nextTurn = () => {
    return {
        type: actionTypes.NEXT_TURN,
    };
};
