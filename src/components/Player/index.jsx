import React from 'react';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';
import './style.css';

const Player = ({ player }) => {
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const playerScreenPosition = getScreenCoordinates(
        player.position,
        gridSize,
        mapZoom,
    );
    return (
        <div
            className="player"
            style={{
                left: playerScreenPosition.x,
                top: playerScreenPosition.y,
            }}
        />
    );
};

Player.propTypes = {
    position: playerProp.isRequired,
};

// Player.defaultProps = {};

export default Player;
