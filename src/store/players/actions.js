export const actionTypes = {
    MOVE_TO: 'MOVE_TO',
};
export const moveTo = (playerId, position) => {
    return {
        type: actionTypes.MOVE_TO,
        playerId,
        position,
    };
};
