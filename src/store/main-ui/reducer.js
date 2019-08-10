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

const mainUI = combineReducers({
    currentScreen,
});

export default mainUI;
