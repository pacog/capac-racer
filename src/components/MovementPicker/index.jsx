import React from 'react';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';

import './style.css';

function MovementPicker({ player }) {
    const position = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const screenPosition = getScreenCoordinates(position, gridSize, mapZoom);
    return (
        <div
            className="movement-picker"
            style={{
                left: screenPosition.x,
                top: screenPosition.y,
            }}
        />
    );
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
};

export default MovementPicker;
