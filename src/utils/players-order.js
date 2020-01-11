export const getPlayersOrderedBy = (players, order) => {
    return order.map((playerId) => {
        return players.find((player) => player.id === playerId);
    });
};
