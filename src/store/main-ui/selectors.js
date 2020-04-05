/**
 * @param {RootState} state
 */
export const getCurrentScreen = (state) => {
    return state.mainUI.currentScreen;
};

/**
 * @param {RootState} state
 */
export const getSelectedCircuit = (state) => {
    return state.mainUI.selectedCircuit;
};

/**
 * @param {RootState} state
 */
export const shouldRandomizePlayerOrderOnStart = (state) => {
    return state.mainUI.randomizePlayerOrderOnStart;
};
/**
 * @param {RootState} state
 */
export const shouldPlayWithTimer = (state) => {
    return state.mainUI.playWithTimer;
};
