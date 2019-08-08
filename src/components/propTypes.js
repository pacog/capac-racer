import PropTypes from 'prop-types';

export const vector2d = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
});

export const player = PropTypes.shape({
    position: vector2d.isRequired,
    speed: vector2d.isRequired,
    prevPositions: PropTypes.arrayOf(vector2d),
});
