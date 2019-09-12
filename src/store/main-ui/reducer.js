import { combineReducers } from 'redux';
import { MAIN_MENU } from 'constants/screens';
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

const mainUI = combineReducers({
    currentScreen,
    selectedCircuit,
});

export default mainUI;
