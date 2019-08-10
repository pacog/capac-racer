import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';

import './style.css';

const Player = ({ player }) => {
    const rootElement = useRef(null);
    useEffect(() => {
        setCSSVars(rootElement.current, player.style);
    }, [player.style]);
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const playerScreenPosition = getScreenCoordinates(
        player.position,
        gridSize,
        mapZoom,
    );
    return (
        <div
            ref={rootElement}
            className="player"
            style={{
                left: playerScreenPosition.x,
                top: playerScreenPosition.y,
            }}
        />
    );
};

Player.propTypes = {
    player: playerProp.isRequired,
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--player-color', style.dotColor);
    element.style.setProperty('--player-size', `${style.dotSize}px`);
    element.style.setProperty('--player-border-radius', style.round);
}

// Player.defaultProps = {};

export default Player;
