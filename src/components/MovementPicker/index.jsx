import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function MovementPicker({ player }) {
    const position = {
        x: player.x + player.speedX,
        y: player.y + player.speedY,
    };
    return (
        <div
            className="player"
            style={{
                left: position.x,
                top: position.y,
            }}
        />
    );
}

MovementPicker.propTypes = {
    player: PropTypes.object.isRequired,
};

export default MovementPicker;
