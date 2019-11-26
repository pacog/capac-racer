import { combineReducers } from 'redux';
import { substract, magnitude } from 'utils/vector2d';
import { checkpointNamesToCheck } from 'constants/checkpoints';
import { HUMAN } from 'constants/player-types';
import { actionTypes } from './actions';

const players = combineReducers({
    byId,
});

const PLAYER_DEFAULT_INFO = {
    position: { x: 0, y: 0 },
    speed: { x: 0, y: 0 },
    prevPositions: [],
    turnsGrounded: 0,
    checkpointsPassed: checkpointNamesToCheck.map(() => false),
    turnsSpent: 0,
    realTimeUsed: 0,
    maxSpeed: 0,
    crashes: 0,
    type: HUMAN,
    levelAI: 0,
};

function byId(state = {}, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYERS:
            return action.players.reduce((accumulator, player) => {
                return {
                    ...accumulator,
                    [player.id]: {
                        ...PLAYER_DEFAULT_INFO,
                        ...player,
                    },
                };
            }, {});
        case actionTypes.MOVE_TO:
            return {
                ...state,
                [action.playerId]: movePlayerTo(
                    state[action.playerId],
                    action.position,
                    action.timePassed,
                ),
            };
        case actionTypes.NOTIFY_COLLISION:
            return {
                ...state,
                [action.playerId]: crashPlayer(
                    state[action.playerId],
                    action.speed,
                    action.timePassed,
                ),
            };

        case actionTypes.REDUCE_GROUNDED:
            return {
                ...state,
                [action.playerId]: reduceGrounded(state[action.playerId]),
            };
        case actionTypes.NOTIFY_VISITED_CHECKPOINTS:
            return {
                ...state,
                [action.playerId]: addCheckpoints(
                    state[action.playerId],
                    action.newCheckpointIndexes,
                ),
            };
        default:
            return state;
    }
}

function movePlayerTo(player, position, timePassed) {
    const newSpeed = substract(position, player.position);
    const speedMagnitude = magnitude(newSpeed);

    return {
        ...player,
        position,
        speed: newSpeed,
        prevPositions: player.prevPositions.concat(position),
        turnsSpent: player.turnsSpent + 1,
        maxSpeed: Math.max(speedMagnitude, player.maxSpeed),
        realTimeUsed: player.realTimeUsed + timePassed,
    };
}

function crashPlayer(player, speed, timePassed) {
    const newSpeed = { x: 0, y: 0 };
    const turnsGrounded = Math.floor(speed / 3);
    return {
        ...player,
        speed: newSpeed,
        turnsGrounded,
        crashes: player.crashes + 1,
        turnsSpent: player.turnsSpent + 1,
        realTimeUsed: player.realTimeUsed + timePassed,
    };
}

function reduceGrounded(player) {
    return {
        ...player,
        turnsGrounded: Math.max(0, player.turnsGrounded - 1),
        turnsSpent: player.turnsSpent + 1,
    };
}

function addCheckpoints(player, newIndexes) {
    const newCheckpoints = player.checkpointsPassed.slice();
    newIndexes.forEach((newIndex) => {
        newCheckpoints[newIndex] = true;
    });
    return {
        ...player,
        checkpointsPassed: newCheckpoints,
    };
}

export default players;
