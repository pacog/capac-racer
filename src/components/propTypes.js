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
});

export const vector2d = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
});

export const player = PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: vector2d.isRequired,
    speed: vector2d.isRequired,
    prevPositions: PropTypes.arrayOf(vector2d),
    style: playerStyle,
});
