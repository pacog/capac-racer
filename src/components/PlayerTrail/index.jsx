import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';
import { PathLine } from 'react-svg-pathline';

import './style.css';

const PlayerTrail = ({ player, isActive }) => {
    const rootElement = useRef(null);
    useEffect(() => {
        setCSSVars(rootElement.current, player.style);
    }, [player.style]);
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
        <div
            className={classNames('player-trail-container', {
                'is-active': isActive,
            })}
            ref={rootElement}
        >
            <svg className="player-trail">
                <PathLine
                    points={points}
                    stroke={player.style.trailColor}
                    strokeWidth={player.style.trailWidth}
                    fill="none"
                    r={2}
                />
            </svg>
            {pointsWithoutLast.map((point) => (
                <div
                    key={`${player.id}_${point.x}_${point.y}`}
                    className="player-trail-point"
                    style={{
                        left: point.x,
                        top: point.y,
                    }}
                />
            ))}
        </div>
    );
};

PlayerTrail.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--player-trail-color', style.dotColor);
    element.style.setProperty('--player-trail-size', `${style.dotSize}px`);
    element.style.setProperty('--player-trail-border-radius', style.round);
}

export default PlayerTrail;
