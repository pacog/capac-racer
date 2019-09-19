import shuffle from 'lodash.shuffle';
import * as gameStates from 'constants/game-states';
import { circuits } from 'constants/circuits';
import {
    setPlayers,
    moveTo,
    notifyCollision,
    reduceGrounded,
    notifyVisitedCheckpoints,
} from 'store/players/actions';
import { changeScreen } from 'store/main-ui/actions';
import { initGame, setGameState, advancePlayerTurn } from 'store/game/actions';
import {
    getAllPlayers,
    getCurrentPlayer,
    getOtherPlayersPositionInScreen,
    hasCurrentPlayerWon,
} from 'store/game/selectors';
import { GAME, MAIN_MENU } from 'constants/screens';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import {
    createFromConfig,
    doesLineCollide,
    getCheckpointsVisitedInLine,
} from 'utils/circuit';
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
        const playersWithMapPosition = initMapPositionForPlayers({
            players,
            playerOrder,
            circuit,
        });
        dispatch(setPlayers(playersWithMapPosition));
        // TODO: add a loading map state (or screen)
        createFromConfig(circuit).then((circuitInfo) => {
            dispatch(initGame(playerOrder, circuitInfo));
            dispatch(changeScreen(GAME));
        });
    };
};

export const initGameWithSavedConfig = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { randomizePlayerOrderOnStart } = state.mainUI;
        const playerOrder = randomizePlayerOrderOnStart
            ? shuffle(state.mainUI.selectedPlayerOrder)
            : state.mainUI.selectedPlayerOrder;
        dispatch(
            initGameWithConfig({
                players: state.mainUI.selectedPlayers,
                playerOrder,
                circuit: circuits[state.mainUI.selectedCircuit],
            }),
        );
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
            return;
        }

        dispatch(detectAndStoreCheckpoints(movementLine, circuit));
        const hasPlayerWon = hasCurrentPlayerWon(getState());
        dispatch(moveTo(player.id, newIntendedPosition));
        if (hasPlayerWon) {
            dispatch(setGameState(gameStates.NOTIFY_VICTORY));
        } else {
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

export const detectAndStoreCheckpoints = (movementLine, circuit) => {
    return (dispatch, getState) => {
        const visitedCheckpointsInTurn = getCheckpointsVisitedInLine(
            movementLine,
            circuit,
        );
        if (!visitedCheckpointsInTurn.length) {
            return;
        }
        const currentPlayer = getCurrentPlayer(getState());
        dispatch(
            notifyVisitedCheckpoints(
                currentPlayer.id,
                visitedCheckpointsInTurn,
            ),
        );
    };
};

export const finishGame = () => {
    return (dispatch) => {
        dispatch(changeScreen(MAIN_MENU));
    };
};

function initMapPositionForPlayers({ players, playerOrder, circuit }) {
    const orderedPlayers = playerOrder.map((playerId) =>
        players.find((player) => player.id === playerId),
    );

    return orderedPlayers.map((player, index) => {
        const initialPosition = circuit.startingPositions[index];
        return {
            ...player,
            position: { ...initialPosition },
            prevPositions: [{ ...initialPosition }],
            speed: { ...circuit.initialSpeed },
        };
    });
}
