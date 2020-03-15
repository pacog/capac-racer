import 'type-defs';

/**
 * @param {RootState} state
 * @returns {string}
 */
export const getCurrentScreen = (state) => {
    return state.mainUI.currentScreen;
};

/**
 * @param {RootState} state
 * @returns {string}
 */
export const getSelectedCircuit = (state) => {
    return state.mainUI.selectedCircuit;
};

/**
 * @param {RootState} state
 * @returns {boolean}
 */
export const shouldRandomizePlayerOrderOnStart = (state) => {
    return state.mainUI.randomizePlayerOrderOnStart;
};
/**
 * @param {RootState} state
 * @returns {boolean}
 */
export const shouldPlayWithTimer = (state) => {
    return state.mainUI.playWithTimer;
};
