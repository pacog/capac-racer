import * as gameStates from 'constants/game-states';
import { projectToScreenPosition } from 'store/map/selectors';
import { getPossibleDestinations } from 'store/players/selectors';

/**
 * @param {RootState} state
 */
export const isGameStarted = (state) => {
    return state.game.gameState !== gameStates.NOT_STARTED;
};

/**
 * @param {RootState} state
 */
export const isWaitingForPlayerInput = (state) => {
    return state.game.gameState === gameStates.WAITING_FOR_PLAYER_INPUT;
};

/**
 * @param {RootState} state
 */
export const isAnimatingRandomSelection = (state) => {
    return state.game.gameState === gameStates.ANIMATING_RANDOM_PLAYER_MOVEMENT;
};

/**
 * @param {RootState} state
 */
export const isAnimatingAISelection = (state) => {
    return state.game.gameState === gameStates.AI_THINKING_SCREEN;
};

/**
 * @param {RootState} state
 */
export const getAISelectedMove = (state) => {
    return state.game.selectedAIMove;
};

/**
 * @param {RootState} state
 */
export const getCurrentPlayer = (state) => {
    if (!isGameStarted(state)) {
        return null;
    }
    return state.players.byId[state.game.currentTurnPlayerId];
};

/**
 * @param {RootState} state
 */
export const getAllPlayers = (state) => {
    return state.game.players.map((playerId) => state.players.byId[playerId]);
};

/**
 * @param {RootState} state
 * @param {string} playerId
 */
export const getOtherPlayers = (state, playerId) => {
    return getAllPlayers(state).filter((player) => player.id !== playerId);
};

/**
 * @param {RootState} state
 * @param {string} playerId
 */
export const getOtherPlayersPositionInScreen = (state, playerId) => {
    return getOtherPlayers(state, playerId)
        .map((player) => player.position)
        .map((position) => projectToScreenPosition(state, position));
};

/**
 * @param {RootState} state
 */
export const getGameState = (state) => {
    return state.game.gameState;
};

/**
 * @param {RootState} state
 */
export const hasCurrentPlayerWon = (state) => {
    const currentPlayer = getCurrentPlayer(state);
    // eslint-disable-next-line no-restricted-syntax
    for (const checkpointHasPassed of currentPlayer.checkpointsPassed) {
        if (!checkpointHasPassed) {
            return false;
        }
    }
    return true;
};

/**
 * @param {RootState} state
 */
export const getOrderedPlayers = (state) => {
    const playerOrder = state.mainUI.selectedPlayerOrder;
    const players = state.mainUI.selectedPlayers;
    return playerOrder.map((playerId) =>
        players.find((player) => player.id === playerId),
    );
};

/**
 * @param {RootState} state
 * @param {Player} player
 */
export const getPossibleDestinationsForPlayerInScreen = (state, player) => {
    const otherPlayers = getAllPlayers(state).filter(
        (otherPlayer) => otherPlayer.id !== player.id,
    );

    return getPossibleDestinations(player, otherPlayers).map((eachPosition) => {
        return {
            screen: projectToScreenPosition(state, eachPosition),
            position: eachPosition,
        };
    });
};

/**
 * @param {RootState} state
 * @param {Player} player
 */
export const getMovedPixelsSinceLastTurn = (state, player) => {
    if (!player.prevPositions.length || player.prevPositions.length < 2) {
        return null;
    }
    const lastPosition = player.prevPositions[player.prevPositions.length - 2];
    const moved = {
        x: lastPosition.x - player.position.x,
        y: lastPosition.y - player.position.y,
    };
    return projectToScreenPosition(state, moved);
};

/**
 * @param {RootState} state
 * @param {Player} player
 */
export const getPivotForPlayerInScreen = (state, player) => {
    const positionAfterSpeed = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    return projectToScreenPosition(state, positionAfterSpeed);
};

/**
 * @param {RootState} state
 */
export const getLatestHighScore = (state) => {
    return state.game.latestHighScore;
};

/**
 * @param {RootState} state
 */
export const getSelectedPosition = (state) => {
    return state.game.selectedPosition;
};

/**
 * @param {RootState} state
 */
export const getRaceHistory = (state) => {
    return state.game.raceHistory;
};

/**
 *
 * @param {RootState} state
 */
export const getCircuitInfo = (state) => state.game.circuitInfo;
