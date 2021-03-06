import PropTypes from 'prop-types';

export const playerStyle = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    dotColor: PropTypes.string,
    dotSize: PropTypes.number,
    round: PropTypes.string,
    trailColor: PropTypes.string,
    trailDotsSize: PropTypes.number,
    trailWidth: PropTypes.number,
    icon: PropTypes.string,
});

export const vector2d = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
});

export const selectablePlayer = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: playerStyle,
});

export const player = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: playerStyle,
    position: vector2d.isRequired,
    speed: vector2d.isRequired,
    prevPositions: PropTypes.arrayOf(vector2d),
});

export const raceHistory = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: playerStyle,
    path: PropTypes.arrayOf(vector2d),
});

export const Score = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    turns: PropTypes.number,
    time: PropTypes.number,
});

export const Circuit = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
});

export const Move = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    dx: PropTypes.number,
    yy: PropTypes.number,
    baseX: PropTypes.number,
    baseY: PropTypes.number,
});
