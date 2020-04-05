import { doesLineCollide } from 'utils/circuit';

/**
 *
 * @param {Player} player
 * @returns {React.CSSProperties}
 */
export const getPlayerStyleCSS = (player) => {
    if (!player) {
        return {};
    }

    return {
        // @ts-ignore
        '--player-color': player.style.dotColor,
        '--player-border-radius': player.style.round,
        '--player-trail-border-radius': player.style.round,
        '--player-size': `${player.style.dotSize + 2}px`,
        '--movement-picker-size': `${player.style.dotSize - 1}px`,
        '--movement-picker-size-center': `${player.style.dotSize + 2}px`,
        '--player-trail-color': player.style.dotColor,
        '--player-trail-size': `${player.style.dotSize}px`,
    };
};

export const getColorForTempLine = (
    player,
    points,
    circuit,
    otherPlayersPosition,
) => {
    if (doesLineCollide(points, circuit, otherPlayersPosition)) {
        return 'red';
    }
    return player.style.trailColor;
};
