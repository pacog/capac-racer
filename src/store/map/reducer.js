import { combineReducers } from 'redux';

const zoom = (state = 1, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const map = combineReducers({
    zoom,
});

export default map;
