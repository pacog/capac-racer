import { doesLineCollide } from 'utils/circuit';

export const setPlayerCSSVars = (element, style) => {
    if (!element) {
        return;
    }
    element.style.setProperty('--player-color', style.dotColor);
    element.style.setProperty('--player-size', `${style.dotSize + 2}px`);
    element.style.setProperty(
        '--movement-picker-size',
        `${style.dotSize - 1}px`,
    );
    element.style.setProperty(
        '--movement-picker-size-center',
        `${style.dotSize + 2}px`,
    );
    element.style.setProperty('--player-border-radius', style.round);
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
