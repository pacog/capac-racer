import * as gameStates from 'constants/game-states';
import { actionTypes } from './actions';

const defaultState = {
    gameState: gameStates.NOT_STARTED,
    prevGameState: null, // We store one game state previous to the current so we can go back after pausing
    players: [],
    currentTurnPlayerId: null,
    circuitInfo: null,
};

const game = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.INIT_GAME:
            return {
                ...state,
                gameState: gameStates.START_SCREEN,
                currentTurnPlayerId: action.playerOrder[0],
                players: action.playerOrder.slice(),
                circuitInfo: { ...action.circuitInfo },
            };
        case actionTypes.START_GAME:
            return { ...state, gameState: gameStates.WAITING_FOR_PLAYER_INPUT };
        case actionTypes.ADVANCE_PLAYER_TURN:
            return {
                ...state,
                currentTurnPlayerId: getNextTurn(
                    state.players,
                    state.currentTurnPlayerId,
                ),
            };
        case actionTypes.SET_GAME_STATE:
            return {
                ...state,
                gameState: action.newGameState,
                prevGameState: state.gameState,
            };
        default:
            return state;
    }
};

export default game;

function getNextTurn(players, currentPlayer) {
    const currentTurnPlayerId = players.indexOf(currentPlayer);
    const nextTurn = (currentTurnPlayerId + 1) % players.length;
    return players[nextTurn];
}
