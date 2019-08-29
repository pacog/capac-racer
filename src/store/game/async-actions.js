import { isEqual } from 'utils/vector2d';
import * as gameStates from 'constants/game-states';
import { setPlayers, moveTo } from 'store/players/actions';
import { changeScreen } from 'store/main-ui/actions';
import { initGame, nextTurn, setGameState } from 'store/game/actions';
import { getAllPlayers } from 'store/game/selectors';
import { GAME } from 'constants/screens';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import { createFromConfig } from 'utils/circuit';

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
        dispatch(moveTo(player.id, newIntendedPosition));
        dispatch(nextTurn());
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
