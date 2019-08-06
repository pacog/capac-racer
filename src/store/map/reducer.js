import { combineReducers } from 'redux';

const zoom = (state = 2, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const gridSize = (state = 10, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const map = combineReducers({
    zoom,
    gridSize,
});

export default map;
