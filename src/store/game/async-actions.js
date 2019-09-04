import * as gameStates from 'constants/game-states';
import {
    setPlayers,
    moveTo,
    notifyCollision,
    reduceGrounded,
} from 'store/players/actions';
import { changeScreen } from 'store/main-ui/actions';
import { initGame, setGameState, advancePlayerTurn } from 'store/game/actions';
import {
    getAllPlayers,
    getCurrentPlayer,
    getOtherPlayersPositionInScreen,
} from 'store/game/selectors';
import { GAME } from 'constants/screens';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import { createFromConfig, doesLineCollide } from 'utils/circuit';
import { projectToScreenPosition } from 'store/map/selectors';
import { distance, isEqual } from 'utils/vector2d';

export const nextTurn = () => {
    return (dispatch, getState) => {
        dispatch(advancePlayerTurn());
        const nextPlayer = getCurrentPlayer(getState());
        if (nextPlayer.turnsGrounded) {
            dispatch(setGameState(gameStates.NOTIFY_GROUNDED));
        } else {
            dispatch(setGameState(gameStates.PLAYER_TURN_START_SCREEN));
        }
    };
};

export const reduceGroundedAndNextTurn = () => {
    return (dispatch, getState) => {
        const currentPlayer = getCurrentPlayer(getState());
        dispatch(reduceGrounded(currentPlayer.id));
        dispatch(nextTurn());
    };
};

export const initGameWithConfig = ({ players, playerOrder, circuit }) => {
    return (dispatch) => {
        dispatch(setPlayers(players));
        // TODO: add a loading map state (or screen)
        createFromConfig(circuit).then((circuitInfo) => {
            dispatch(initGame(playerOrder, circuitInfo));
            dispatch(changeScreen(GAME));
        });
    };
};

export const handlePlayerCollision = (player, newIntendedPosition) => {
    return (dispatch) => {
        const speed = distance(player.position, newIntendedPosition);
        dispatch(setGameState(gameStates.NOTIFY_COLLISION));
        dispatch(notifyCollision(player.id, speed));
    };
};

export const handlePlayerMovement = (player, newIntendedPosition) => {
    return (dispatch, getState) => {
        const allPlayers = getAllPlayers(getState());
        const collidingPlayer = allPlayers
            .filter((otherPlayer) => otherPlayer.id !== player.id)
            .find((otherPlayer) =>
                isEqual(otherPlayer.position, newIntendedPosition),
            );
        if (collidingPlayer) {
            return;
        }
        waitingForPlayerCounter.stop();
        const state = getState();
        const circuit = state.game.circuitInfo;
        const movementLine = [
            projectToScreenPosition(state, player.position),
            projectToScreenPosition(state, newIntendedPosition),
        ];
        const otherPlayersPosition = getOtherPlayersPositionInScreen(
            state,
            player.id,
        );
        if (doesLineCollide(movementLine, circuit, otherPlayersPosition)) {
            dispatch(handlePlayerCollision(player, newIntendedPosition));
        } else {
            dispatch(moveTo(player.id, newIntendedPosition));
            dispatch(nextTurn());
        }
    };
};

export const startWaitingForPlayerInput = () => {
    return (dispatch) => {
        dispatch(setGameState(gameStates.WAITING_FOR_PLAYER_INPUT));
        const callbackOnEnd = () => {
            dispatch(nextTurn());
        };
        waitingForPlayerCounter.restart({ callbackOnEnd });
    };
};
