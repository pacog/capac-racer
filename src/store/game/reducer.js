import * as gameStates from 'constants/game-states';
import { actionTypes } from './actions';

const defaultState = {
    gameState: gameStates.NOT_STARTED,
    prevGameState: null, // We store one game state previous to the current so we can go back after pausing
    players: [],
    currentTurnPlayerId: null,
    circuitInfo: null,
    latestHighScore: null, // If somebody achived a high score, it will be stored here until the next game starts
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
                latestHighScore: null,
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
        case actionTypes.SET_LATEST_HIGH_SCORE:
            return {
                ...state,
                latestHighScore: action.highScore,
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
