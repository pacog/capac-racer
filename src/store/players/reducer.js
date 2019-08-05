import { combineReducers } from 'redux';

const initialState = {
    '1': {
        x: 5,
        y: 25,
    },
};

const byId = (state = initialState, action) => {
    switch (action.type) {
        // case 'ACTION_NAME':
        //     return state;
        default:
            return state;
    }
};

const players = combineReducers({
    byId,
});

export default players;
