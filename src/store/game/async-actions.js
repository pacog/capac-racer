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
    initReplay,
    setSelectedAIMove,
} from 'store/game/actions';
import {
    getAllPlayers,
    getCurrentPlayer,
    hasCurrentPlayerWon,
    getOtherPlayers,
    getSelectedPosition,
} from 'store/game/selectors';
import { GAME, MAIN_MENU, LOADING_GAME, REPLAY_GAME } from 'constants/screens';
import {
    TIME_SHOWING_RANDOM_SELECTOR,
    WAIT_AFTER_AI_GROUNDED,
    WAIT_AFTER_AI_COLLISION,
} from 'constants/ux';
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
import { AI, HUMAN } from 'constants/player-types';
import { chooseNextMovement } from 'utils/ai';
import aiLevels from 'constants/ai-levels';
import { isTouchDevice } from 'utils/is-touch-device';
import { storeSavedPlayers } from 'utils/playersStorage';
import { track } from 'utils/analytics';

const notifyGrounded = (nextPlayer) => {
    return (dispatch) => {
        if (nextPlayer.type === HUMAN) {
            dispatch(setGameState(gameStates.NOTIFY_GROUNDED));
            return;
        }
        dispatch(setGameState(gameStates.NOTIFY_AI_GROUNDED));
        setTimeout(() => {
            dispatch(reduceGroundedAndNextTurn());
        }, WAIT_AFTER_AI_GROUNDED);
    };
};

export const startTurn = () => {
    return (dispatch, getState) => {
        const nextPlayer = getCurrentPlayer(getState());
        if (nextPlayer.turnsGrounded) {
            dispatch(notifyGrounded(nextPlayer));
            return;
        }

        if (nextPlayer.type === AI) {
            dispatch(handleAITurn(nextPlayer));
            return;
        }

        if (getState().mainUI.playWithTimer) {
            dispatch(setGameState(gameStates.PLAYER_TURN_START_SCREEN));
        } else {
            dispatch(startWaitingForPlayerInput());
        }
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
    return (dispatch, getState) => {
        dispatch(changeScreen(LOADING_GAME));
        const playersWithMapPosition = initMapPositionForPlayers({
            players,
            playerOrder,
            circuit,
        }).map(fixPlayersWithoutName);

        dispatch(setPlayers(playersWithMapPosition));

        track('init_game', { category: 'game', label: circuit?.id });
        track('total_players', {
            category: 'game',
            value: players.length,
            label: circuit?.id,
        });
        track('human_players', {
            category: 'game',
            value: players.filter((player) => player.type === HUMAN).length,
            label: circuit?.id,
        });
        track('ai_players', {
            category: 'game',
            value: players.filter((player) => player.type === AI).length,
            label: circuit?.id,
        });

        // if we don't want timer, set infinite time
        if (!getState().mainUI.playWithTimer) {
            waitingForPlayerCounter.setTimeToWait(-1);
        }

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

        storeSavedPlayers(
            state.mainUI.selectedPlayerOrder,
            state.mainUI.selectedPlayers,
        );

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
        track('collision', {
            category: 'game',
            label: player?.type === AI ? 'ai' : 'human',
            value: speed,
        });
        dispatch(notifyCollision(player.id, speed, timePassed));
        if (player.type === AI) {
            dispatch(setGameState(gameStates.NOTIFY_AI_COLLISION));
            setTimeout(() => {
                dispatch(nextTurn());
            }, WAIT_AFTER_AI_COLLISION);
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
            dispatch(handleVictory(getCurrentPlayer(getState()), circuit));
            return;
        }
        dispatch(nextTurn());
    };
};

function handleVictory(player, circuit) {
    return (dispatch) => {
        track('victory', { category: 'game' });
        const score = {
            name: player.name,
            date: new Date(),
            turns: player.turnsSpent,
            realTimeUsed: player.realTimeUsed,
            maxSpeed: player.maxSpeed,
            crashes: player.crashes,
            path: player.prevPositions,
            playerStyle: player.style,
        };

        if (shouldScoreBeAdded(score, circuit, player)) {
            const newScore = addScore(score, circuit, player);
            track('high_score', {
                category: 'game',
                label: circuit?.id,
                value: newScore?.turns,
            });
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
        const selectedPosition = getSelectedPosition(getState());
        dispatch(handlePlayerMovement(player, selectedPosition));
    };
};

export const startWaitingForPlayerInput = () => {
    return (dispatch, getState) => {
        dispatch(setGameState(gameStates.WAITING_FOR_PLAYER_INPUT));
        let callbackOnEnd = () => {};

        if (getState().mainUI.playWithTimer) {
            callbackOnEnd = () => {
                const selectedPosition = getSelectedPosition(getState());
                if (selectedPosition) {
                    // If a position was already selected we choose that one
                    const player = getCurrentPlayer(getState());
                    dispatch(handlePlayerMovement(player, selectedPosition));
                    return;
                }
                dispatch(showRandomSelectorAndMovePlayer());
            };
        }

        waitingForPlayerCounter.restart({ callbackOnEnd });
    };
};

export const handleAITurn = (player) => {
    return async (dispatch, getState) => {
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
        // eslint-disable-next-line no-unused-vars
        const result = await Promise.all([
            timeout(minTimeToWaitForPlayer),
            nextMovementPromise,
        ]);
        const nextMovement = result[1];
        dispatch(setSelectedAIMove(nextMovement));
        await timeout(1000);
        dispatch(handlePlayerMovement(player, nextMovement));
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
        track('finish_game', { category: 'game' });
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

function fixPlayersWithoutName(player, index) {
    if (player.name) {
        return player;
    }
    return {
        ...player,
        name: getNameForPlayerWithoutName(index),
    };
}

function getNameForPlayerWithoutName(index) {
    switch (index) {
        case 0:
            return 'Anonymous';
        case 1:
            return 'Mistery racer';
        case 2:
            return 'Shy runner';
        case 3:
            return 'Jane Doe';
        default:
            return 'John Doe';
    }
}

export const showReplay = (score, circuit) => {
    return (dispatch) => {
        track('show_replay', { category: 'replay' });
        createFromConfig(circuit).then((circuitInfo) => {
            dispatch(initReplay(score, circuitInfo));
            dispatch(changeScreen(REPLAY_GAME));
        });
    };
};
