export const actionTypes = {
    INIT_GAME: 'INIT_GAME',
    START_GAME: 'START_GAME',
    SET_GAME_STATE: 'SET_GAME_STATE',
    ADVANCE_PLAYER_TURN: 'ADVANCE_PLAYER_TURN',
    SET_CIRCUIT: 'SET_CIRCUIT',
    SET_LATEST_HIGH_SCORE: 'SET_LATEST_HIGH_SCORE',
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

export const advancePlayerTurn = () => {
    return {
        type: actionTypes.ADVANCE_PLAYER_TURN,
    };
};

export const setLatestHighScore = (highScore) => {
    return {
        type: actionTypes.SET_LATEST_HIGH_SCORE,
        highScore,
    };
};
