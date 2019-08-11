export const actionTypes = {
    INIT_GAME: 'INIT_GAME',
};
export const initGame = (playerOrder) => {
    return {
        type: actionTypes.INIT_GAME,
        playerOrder,
    };
};

export const startGame = () => {
    return {
        type: actionTypes.START_GAME,
    };
};
