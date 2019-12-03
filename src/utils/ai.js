import { getPossibleDestinations } from 'store/players/selectors';
import { pickRandomFromArray } from 'utils/random';

export const chooseNextMovement = (player, otherPlayers, circuit) => {
    const positions = getPossibleDestinations(player, otherPlayers);
    return pickRandomFromArray(positions);
};
