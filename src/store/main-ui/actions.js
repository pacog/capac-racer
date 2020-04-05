import { getUniqueIdString as id } from 'utils/getUniqueIdString';

export const actionTypes = {
    CHANGE_SCREEN: id('CHANGE_SCREEN'),
    SET_SELECTED_CIRCUIT: id('SET_SELECTED_CIRCUIT'),
    SET_SELECTED_PLAYERS: id('SET_SELECTED_PLAYERS'),
    REMOVE_PLAYER: id('REMOVE_PLAYER'),
    UPDATE_PLAYER: id('UPDATE_PLAYER'),
    TOGGLE_RANDOMIZE_PLAYER_ORDER_ON_START:
        'TOGGLE_RANDOMIZE_PLAYER_ORDER_ON_START',
    TOGGLE_PLAY_WITH_TIMER: id('TOGGLE_PLAY_WITH_TIMER'),
};
export const changeScreen = (screenId) => {
    return {
        type: actionTypes.CHANGE_SCREEN,
        screenId,
    };
};
export const setSelectedCircuit = (circuitId) => {
    return {
        type: actionTypes.SET_SELECTED_CIRCUIT,
        circuitId,
    };
};

export const setSelectedPlayers = (players, playerOrder) => {
    return {
        type: actionTypes.SET_SELECTED_PLAYERS,
        players,
        playerOrder,
    };
};

export const removePlayer = (playerId) => {
    return {
        type: actionTypes.REMOVE_PLAYER,
        playerId,
    };
};

export const updatePlayer = (playerId, attrsToUpdate) => {
    return {
        type: actionTypes.UPDATE_PLAYER,
        playerId,
        attrsToUpdate,
    };
};

export const toggleRandomizePlayerOrderOnStart = () => {
    return {
        type: actionTypes.TOGGLE_RANDOMIZE_PLAYER_ORDER_ON_START,
    };
};

export const togglePlayWithTimer = () => {
    return {
        type: actionTypes.TOGGLE_PLAY_WITH_TIMER,
    };
};
