import { combineReducers } from 'redux';
import { substract } from 'utils/vector2d';
import { actionTypes } from './actions';

const initialState = {
    '1': {
        position: {
            x: 5,
            y: 25,
        },
        speed: {
            x: -1,
            y: -2,
        },
    },
};

const byId = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MOVE_TO:
            console.log('moveto', action.position);
            return {
                ...state,
                [action.playerId]: movePlayerTo(
                    state[action.playerId],
                    action.position,
                ),
            };
        default:
            return state;
    }
};

const players = combineReducers({
    byId,
});

function movePlayerTo(player, position) {
    const newSpeed = substract(position, player.position);
    return { ...player, position, speed: newSpeed };
}

export default players;
