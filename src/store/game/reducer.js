import { combineReducers } from 'redux';
import * as gameStates from 'constants/game-states';
import { actionTypes } from './actions';

const currentTurn = (state = null, action) => {
    switch (action.type) {
        case actionTypes.INIT_GAME:
            return action.playerOrder[0];
        default:
            return state;
    }
};

const players = (state = [], action) => {
    switch (action.type) {
        case actionTypes.INIT_GAME:
            return action.playerOrder.slice();
        default:
            return state;
    }
};

const gameState = (state = gameStates.NOT_STARTED, action) => {
    switch (action.type) {
        case actionTypes.INIT_GAME:
            return gameStates.START_SCREEN;
        case actionTypes.START_GAME:
            return gameStates.WAITING_FOR_PLAYER_INPUT;
        default:
            return state;
    }
};

const mainUI = combineReducers({
    currentTurn,
    players,
    gameState,
});

export default mainUI;
