import React from 'react';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';
import { PathLine } from 'react-svg-pathline';

import './style.css';

const PlayerTrail = ({ player }) => {
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    if (!player.prevPositions.length) {
        return '';
    }
    const points = player.prevPositions.map((position) =>
        getScreenCoordinates(position, gridSize, mapZoom),
    );
    return (
        <svg className="player-trail">
            <PathLine
                points={points}
                stroke="lightskyblue"
                strokeWidth="2"
                fill="none"
                r={2}
            />
        </svg>
    );
};

PlayerTrail.propTypes = {
    player: playerProp.isRequired,
};

export default PlayerTrail;
