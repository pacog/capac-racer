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

/**
 * @type {import('react').Reducer<import('redux').CombinedState<MapState>, import('redux').AnyAction>}
 */
const map = combineReducers({
    zoom,
    gridSize,
});

export default map;
