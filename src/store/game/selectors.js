import * as gameStates from 'constants/game-states';

export const isGameStarted = (state) => {
    return state.game.currentState !== gameStates.NOT_STARTED;
};

export const getCurrentPlayer = (state) => {
    if (!isGameStarted()) {
        return null;
    }
    return state.players.byId[state.game.currentTurn];
};
