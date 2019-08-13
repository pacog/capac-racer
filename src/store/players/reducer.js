import { combineReducers } from 'redux';
import { substract } from 'utils/vector2d';
import { actionTypes } from './actions';

const players = combineReducers({
    byId,
});

function byId(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYERS:
            return action.players.reduce((accumulator, player) => {
                return {
                    ...accumulator,
                    [player.id]: player,
                };
            }, {});
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
}

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
