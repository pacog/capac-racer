import { combineReducers } from 'redux';
import { MAIN_MENU } from 'constants/screens';
import { BLUE } from 'constants/player-styles';
import { actionTypes } from './actions';

const currentScreen = (state = MAIN_MENU, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SCREEN:
            return action.screenId;
        default:
            return state;
    }
};

const selectedCircuit = (state = null, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_CIRCUIT:
            return action.circuitId;
        default:
            return state;
    }
};

const initialPlayers = [
    {
        id: 'DEFAULT_PLAYER',
        name: 'Player One',
        style: BLUE,
    },
];

const selectedPlayers = (state = initialPlayers, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_PLAYERS:
            return action.players;
        case actionTypes.REMOVE_PLAYER:
            return state.filter((player) => player.id !== action.playerId);
        case actionTypes.UPDATE_PLAYER:
            return state.map((player) => {
                if (player.id !== action.playerId) {
                    return player;
                }
                return {
                    ...player,
                    ...action.attrsToUpdate,
                };
            });
        default:
            return state;
    }
};

const defaultOrder = ['DEFAULT_PLAYER'];
const selectedPlayerOrder = (state = defaultOrder, action) => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_PLAYERS:
            return action.playerOrder;
        case actionTypes.REMOVE_PLAYER:
            return state.filter((playerId) => playerId !== action.playerId);
        default:
            return state;
    }
};

const mainUI = combineReducers({
    currentScreen,
    selectedCircuit,
    selectedPlayerOrder,
    selectedPlayers,
});

export default mainUI;
