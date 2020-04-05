import { getUniqueIdString as id } from 'utils/getUniqueIdString';

export const actionTypes = {
    INIT_GAME: id('INIT_GAME'),
    INIT_REPLAY: id('INIT_REPLAY'),
    SET_GAME_STATE: id('SET_GAME_STATE'),
    ADVANCE_PLAYER_TURN: id('ADVANCE_PLAYER_TURN'),
    SET_CIRCUIT: id('SET_CIRCUIT'),
    SET_LATEST_HIGH_SCORE: id('SET_LATEST_HIGH_SCORE'),
    SET_SELECTED_POSITION: id('SET_SELECTED_POSITION'),
    SET_SELECTED_AI_MOVE: id('SET_SELECTED_AI_MOVE'),
};
export const initGame = (playerOrder, circuitInfo) => {
    return {
        type: actionTypes.INIT_GAME,
        playerOrder,
        circuitInfo,
    };
};

export const initReplay = (raceHistory, circuitInfo) => {
    return {
        type: actionTypes.INIT_REPLAY,
        raceHistory,
        circuitInfo,
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

export const setSelectedPosition = (newPosition) => {
    return {
        type: actionTypes.SET_SELECTED_POSITION,
        newPosition,
    };
};

export const setSelectedAIMove = (newMove) => {
    return {
        type: actionTypes.SET_SELECTED_AI_MOVE,
        newMove,
    };
};
