import { combineReducers } from 'redux';
import { MAIN_MENU } from 'constants/screens';
import { STYLES } from 'constants/player-styles';
import { getRandomName } from 'utils/getRandomName';
import { pickRandomFromArray } from 'utils/random';
import { HUMAN } from 'constants/player-types';
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
        name: getRandomName(),
        style: pickRandomFromArray(Object.values(STYLES)),
        type: HUMAN,
        levelAI: 0,
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

const randomizePlayerOrderOnStart = (state = true, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_RANDOMIZE_PLAYER_ORDER_ON_START:
            return !state;
        default:
            return state;
    }
};

const playWithTimer = (state = true, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_PLAY_WITH_TIMER:
            return !state;
        default:
            return state;
    }
};

const mainUI = combineReducers({
    currentScreen,
    selectedCircuit,
    selectedPlayerOrder,
    selectedPlayers,
    randomizePlayerOrderOnStart,
    playWithTimer,
});

export default mainUI;
