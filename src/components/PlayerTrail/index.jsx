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
    const pointsWithoutLast = points.slice(0, points.length - 1);
    return (
        <>
            <svg className="player-trail">
                <PathLine
                    points={points}
                    stroke="lightskyblue"
                    strokeWidth="2"
                    fill="none"
                    r={2}
                />
            </svg>
            {pointsWithoutLast.map((point) => (
                <div
                    key={`${point.x}_${point.y}`}
                    className="player-trail-point"
                    style={{
                        left: point.x,
                        top: point.y,
                    }}
                />
            ))}
        </>
    );
};

PlayerTrail.propTypes = {
    player: playerProp.isRequired,
};

export default PlayerTrail;
