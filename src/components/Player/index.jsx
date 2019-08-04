import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Player = ({ x, y }) => {
    return (
        <div
            className="player"
            style={{
                left: x,
                top: y,
            }}
        />
    );
};

Player.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

Player.defaultProps = {};

export default Player;
