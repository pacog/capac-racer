import { isEqual } from 'utils/vector2d';

const DISTANCE_TO_MOVE = 1;

export const getPossibleDestinations = (player, otherPlayers) => {
    const positionAfterSpeed = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    const positions = [];
    for (let i = -DISTANCE_TO_MOVE; i <= DISTANCE_TO_MOVE; i += 1) {
        for (let j = -DISTANCE_TO_MOVE; j <= DISTANCE_TO_MOVE; j += 1) {
            positions.push({
                x: positionAfterSpeed.x + i,
                y: positionAfterSpeed.y + j,
            });
        }
    }
    return positions.filter(
        (position) => !isPositionColliding(position, otherPlayers),
    );
};

function isPositionColliding(position, otherPlayers) {
    return !!otherPlayers
        .map((player) => player.position)
        .find((otherPosition) => isEqual(otherPosition, position));
}
