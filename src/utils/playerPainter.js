import { doesLineCollide } from 'utils/circuit';

/**
 *
 * @param {any} player
 * @returns {React.CSSProperties}
 */
export const getPlayerStyleCSS = (player) => {
    if (!player) {
        return {};
    }
    // TODO this function can receive raceHistory or player. Player should be am attribute of raceHistory to avoid having this two different input types
    const style = player.style || player.playerStyle || {};

    return {
        // @ts-ignore
        '--player-color': style.dotColor,
        '--player-border-radius': style.round,
        '--player-trail-border-radius': style.round,
        '--player-size': `${style.dotSize + 2}px`,
        '--movement-picker-size': `${style.dotSize - 1}px`,
        '--movement-picker-size-center': `${style.dotSize + 2}px`,
        '--player-trail-color': style.dotColor,
        '--player-trail-size': `${style.dotSize}px`,
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
