import * as gameStates from 'constants/game-states';
import { actionTypes } from './actions';

const defaultState = {
    gameState: gameStates.NOT_STARTED,
    prevGameState: null, // We store one game state previous to the current so we can go back after pausing
    players: [],
    currentTurnPlayerId: null,
    circuitInfo: null,
    latestHighScore: null, // If somebody achived a high score, it will be stored here until the next game starts
    selectedPosition: null, // When we use a touch interface we can store the position that has been selected before confirming the move
    raceHistory: null, // Used when replaying a game
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
                selectedPosition: null,
            };
        case actionTypes.INIT_REPLAY:
            return {
                ...state,
                gameState: gameStates.START_SCREEN,
                circuitInfo: { ...action.circuitInfo },
                raceHistory: action.raceHistory,
            };
        case actionTypes.ADVANCE_PLAYER_TURN:
            return {
                ...state,
                currentTurnPlayerId: getNextTurn(
                    state.players,
                    state.currentTurnPlayerId,
                ),
                selectedPosition: null,
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
        case actionTypes.SET_SELECTED_POSITION:
            return {
                ...state,
                selectedPosition: action.newPosition,
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
