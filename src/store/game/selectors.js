import * as gameStates from 'constants/game-states';
import { projectToScreenPosition } from 'store/map/selectors';
import { getPossibleDestinations } from 'store/players/selectors';

export const isGameStarted = (state) => {
    return state.game.gameState !== gameStates.NOT_STARTED;
};

export const isWaitingForPlayerInput = (state) => {
    return state.game.gameState === gameStates.WAITING_FOR_PLAYER_INPUT;
};

export const isAnimatingRandomSelection = (state) => {
    return state.game.gameState === gameStates.ANIMATING_RANDOM_PLAYER_MOVEMENT;
};

export const isAnimatingAISelection = (state) => {
    return state.game.gameState === gameStates.AI_THINKING_SCREEN;
};

export const getCurrentPlayer = (state) => {
    if (!isGameStarted(state)) {
        return null;
    }
    return state.players.byId[state.game.currentTurnPlayerId];
};

export const getAllPlayers = (state) => {
    return state.game.players.map((playerId) => state.players.byId[playerId]);
};

export const getOtherPlayers = (state, playerId) => {
    return getAllPlayers(state).filter((player) => player.id !== playerId);
};

export const getOtherPlayersPositionInScreen = (state, playerId) => {
    return getOtherPlayers(state, playerId)
        .map((player) => player.position)
        .map((position) => projectToScreenPosition(state, position));
};

export const getGameState = (state) => {
    return state.game.gameState;
};

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

export const getOrderedPlayers = (state) => {
    const playerOrder = state.mainUI.selectedPlayerOrder;
    const players = state.mainUI.selectedPlayers;
    return playerOrder.map((playerId) =>
        players.find((player) => player.id === playerId),
    );
};

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

export const getLatestHighScore = (state) => {
    return state.game.latestHighScore;
};
