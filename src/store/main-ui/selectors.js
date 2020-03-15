/**
 * @param {RootState} state
 * @returns {string}
 */
export const getCurrentScreen = (state) => {
    return state.mainUI.currentScreen;
};
