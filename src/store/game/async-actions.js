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
import {
    initGame,
    setGameState,
    advancePlayerTurn,
    setLatestHighScore,
    setSelectedPosition,
} from 'store/game/actions';
import {
    getAllPlayers,
    getCurrentPlayer,
    hasCurrentPlayerWon,
    getOtherPlayers,
    getSelectedPosition,
} from 'store/game/selectors';
import { GAME, MAIN_MENU } from 'constants/screens';
import { TIME_SHOWING_RANDOM_SELECTOR } from 'constants/ux';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import {
    createFromConfig,
    getCheckpointsVisitedInLine,
    checkIfPlayerCanMove,
} from 'utils/circuit';
import { projectToScreenPosition } from 'store/map/selectors';
import { distance } from 'utils/vector2d';
import { getPossibleDestinations } from 'store/players/selectors';
import { pickRandomFromArray, getRandomInRange } from 'utils/random';
import { timeout } from 'utils/gameLoopTimeout';
import { shouldScoreBeAdded, addScore } from 'utils/highScoresStorage';
import { AI } from 'constants/player-types';
import { chooseNextMovement } from 'utils/ai';
import aiLevels from 'constants/ai-levels';
import { isTouchDevice } from 'utils/is-touch-device';

export const startTurn = () => {
    return (dispatch, getState) => {
        const nextPlayer = getCurrentPlayer(getState());
        if (nextPlayer.turnsGrounded) {
            dispatch(setGameState(gameStates.NOTIFY_GROUNDED));
            return;
        }

        if (nextPlayer.type === AI) {
            dispatch(handleAITurn(nextPlayer));
            return;
        }

        dispatch(setGameState(gameStates.PLAYER_TURN_START_SCREEN));
    };
};

export const nextTurn = () => {
    return (dispatch) => {
        dispatch(advancePlayerTurn());
        dispatch(startTurn());
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

export const handlePlayerCollision = (
    player,
    newIntendedPosition,
    timePassed,
) => {
    return (dispatch) => {
        const speed = distance(player.position, newIntendedPosition);
        dispatch(notifyCollision(player.id, speed, timePassed));
        if (player.type === AI) {
            dispatch(setGameState(gameStates.NOTIFY_AI_COLLISION));
            return;
        }
        dispatch(setGameState(gameStates.NOTIFY_COLLISION));
    };
};

export const handleCorrectMovement = (
    player,
    newIntendedPosition,
    timePassed,
    movementLine,
    circuit,
) => {
    return (dispatch, getState) => {
        dispatch(detectAndStoreCheckpoints(movementLine, circuit));
        const hasPlayerWon = hasCurrentPlayerWon(getState());
        dispatch(moveTo(player.id, newIntendedPosition, timePassed));
        if (hasPlayerWon) {
            dispatch(handleVictory(player, circuit));
            return;
        }
        dispatch(nextTurn());
    };
};

function handleVictory(player, circuit) {
    return (dispatch) => {
        const score = {
            name: player.name,
            date: new Date(),
            turns: player.turnsSpent,
            realTimeUsed: player.realTimeUsed,
            maxSpeed: player.maxSpeed,
            crashes: player.crashes,
        };
        if (shouldScoreBeAdded(score, circuit, player)) {
            const newScore = addScore(score, circuit, player);
            dispatch(setLatestHighScore(newScore));
            dispatch(setGameState(gameStates.NOTIFY_HIGH_SCORE));
        } else {
            dispatch(setGameState(gameStates.NOTIFY_VICTORY));
        }
    };
}

const handlePlayerMovement = (player, newIntendedPosition) => {
    return (dispatch, getState) => {
        const timePassed = waitingForPlayerCounter.getTimePassed();
        waitingForPlayerCounter.stop();
        const state = getState();
        const circuit = state.game.circuitInfo;
        const mapZoom = state.map.zoom;
        const mapGridSize = state.map.gridSize;
        const canMoveThere = checkIfPlayerCanMove({
            from: player.position,
            to: newIntendedPosition,
            zoom: mapZoom,
            gridSize: mapGridSize,
            circuit,
            otherPlayers: getOtherPlayers(state, player.id),
        });

        if (!canMoveThere) {
            dispatch(
                handlePlayerCollision(player, newIntendedPosition, timePassed),
            );
            return;
        }

        const movementLine = [
            projectToScreenPosition(state, player.position),
            projectToScreenPosition(state, newIntendedPosition),
        ];

        dispatch(
            handleCorrectMovement(
                player,
                newIntendedPosition,
                timePassed,
                movementLine,
                circuit,
            ),
        );
    };
};

export const handlePlayerPositionSelection = (player, newIntendedPosition) => {
    return (dispatch) => {
        if (isTouchDevice) {
            dispatch(setSelectedPosition(newIntendedPosition));
            return;
        }
        dispatch(handlePlayerMovement(player, newIntendedPosition));
    };
};

export const confirmPositionSelection = (player) => {
    return (dispatch, getState) => {
        const newIntendedPosition = getSelectedPosition(getState());
        dispatch(handlePlayerMovement(player, newIntendedPosition));
    };
};

export const startWaitingForPlayerInput = () => {
    return (dispatch) => {
        dispatch(setGameState(gameStates.WAITING_FOR_PLAYER_INPUT));
        const callbackOnEnd = () => {
            dispatch(showRandomSelectorAndMovePlayer());
        };
        waitingForPlayerCounter.restart({ callbackOnEnd });
    };
};

export const handleAITurn = (player) => {
    return (dispatch, getState) => {
        dispatch(setGameState(gameStates.AI_THINKING_SCREEN));
        const state = getState();
        const circuit = state.game.circuitInfo;
        const otherPlayers = getAllPlayers(getState()).filter(
            (otherPlayer) => otherPlayer.id !== player.id,
        );
        const mapZoom = state.map.zoom;
        const mapGridSize = state.map.gridSize;
        const nextMovementPromise = chooseNextMovement(
            player,
            otherPlayers,
            circuit,
            mapZoom,
            mapGridSize,
        );

        const minTimeToWaitForPlayer = getMinTimeToWaitForPlayer(player);
        Promise.all([
            timeout(minTimeToWaitForPlayer),
            nextMovementPromise,
        ]).then((results) => {
            const nextMovement = results[1];
            dispatch(handlePlayerMovement(player, nextMovement));
        });
    };
};

function getMinTimeToWaitForPlayer(player) {
    const { timeThinking } = aiLevels[player.levelAI];
    return getRandomInRange(timeThinking.min, timeThinking.max);
}

function showRandomSelectorAndMovePlayer() {
    return (dispatch, getState) => {
        dispatch(setGameState(gameStates.ANIMATING_RANDOM_PLAYER_MOVEMENT));
        timeout(TIME_SHOWING_RANDOM_SELECTOR).then(() => {
            const player = getCurrentPlayer(getState());
            const otherPlayers = getAllPlayers(getState()).filter(
                (otherPlayer) => otherPlayer.id !== player.id,
            );
            const positions = getPossibleDestinations(player, otherPlayers);
            const nextPosition = pickRandomFromArray(positions);
            dispatch(handlePlayerMovement(player, nextPosition));
        });
    };
}

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
        waitingForPlayerCounter.reset();
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
            checkpointsPassed: circuit.checkpoints.map(() => false),
        };
    });
}

export const pause = () => {
    return (dispatch) => {
        dispatch(setGameState(gameStates.SHOW_MENU));
        waitingForPlayerCounter.pause();
    };
};

export const unpause = () => {
    return (dispatch, getState) => {
        const lastState = getState().game.prevGameState;
        dispatch(setGameState(lastState));
        waitingForPlayerCounter.unpause();
    };
};

export const tryToToggleInGameMenu = () => {
    return (dispatch, getState) => {
        const { gameState } = getState().game;
        switch (gameState) {
            case gameStates.SHOW_MENU:
                dispatch(unpause());
                break;
            case gameStates.WAITING_FOR_PLAYER_INPUT:
                dispatch(pause());
                break;
            default:
        }
    };
};

export const tryToShowInGameMenu = () => {
    return (dispatch, getState) => {
        const { gameState } = getState().game;
        switch (gameState) {
            case gameStates.WAITING_FOR_PLAYER_INPUT:
                dispatch(pause());
                break;
            default:
        }
    };
};
