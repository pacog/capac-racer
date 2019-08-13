import * as gameStates from 'constants/game-states';
import { actionTypes } from './actions';

const defaultState = {
    gameState: gameStates.NOT_STARTED,
    players: [],
    currentTurn: null,
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.INIT_GAME:
            return {
                ...state,
                gameState: gameStates.START_SCREEN,
                currentTurn: action.playerOrder[0],
                players: action.playerOrder.slice(),
            };
        case actionTypes.START_GAME:
            return { ...state, gameState: gameStates.WAITING_FOR_PLAYER_INPUT };
        case actionTypes.NEXT_TURN:
            return {
                ...state,
                gameState: gameStates.WAITING_FOR_PLAYER_INPUT,
                currentTurn: getNextTurn(state.players, state.currentTurn),
            };
        case actionTypes.SET_GAME_STATE:
            return { ...state, gameState: action.newGameState };
        default:
            return state;
    }
};

export default game;

function getNextTurn(players, currentPlayer) {
    const currentTurn = players.indexOf(currentPlayer);
    const nextTurn = (currentTurn + 1) % players.length;
    return players[nextTurn];
}
