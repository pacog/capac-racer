import { combineReducers } from 'redux';
import { substract } from 'utils/vector2d';
import { BLUE } from 'constants/player-styles';
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
        prevPositions: [
            {
                x: 5,
                y: 25,
            },
        ],
        style: BLUE,
    },
};

const byId = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MOVE_TO:
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
    return {
        ...player,
        position,
        speed: newSpeed,
        prevPositions: player.prevPositions.concat(position),
    };
}

export default players;
