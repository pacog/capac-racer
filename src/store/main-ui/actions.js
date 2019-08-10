export const actionTypes = {
    CHANGE_SCREEN: 'CHANGE_SCREEN',
};
export const changeScreen = (screenId) => {
    return {
        type: actionTypes.CHANGE_SCREEN,
        screenId,
    };
};
