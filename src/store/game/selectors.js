import * as gameStates from 'constants/game-states';

export const isGameStarted = (state) => {
    return state.game.gameState !== gameStates.NOT_STARTED;
};

export const isWaitingForPlayerInput = (state) => {
    return state.game.gameState === gameStates.WAITING_FOR_PLAYER_INPUT;
};

export const getCurrentPlayer = (state) => {
    if (!isGameStarted(state)) {
        return null;
    }
    return state.players.byId[state.game.currentTurn];
};

export const getAllPlayers = (state) => {
    return state.game.players.map((playerId) => state.players.byId[playerId]);
};