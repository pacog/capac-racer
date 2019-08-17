/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';
import { isEqual } from 'utils/vector2d';

import './style.css';

const DISTANCE_TO_MOVE = 1;

function MovementPicker({ player, onPositionSelected, otherPlayers }) {
    const rootElement = useRef(null);
    const [tempLine, setTempLine] = useState(null);
    useEffect(() => {
        setCSSVars(rootElement.current, player.style);
    }, [player.style]);
    useEffect(() => {
        setTempLine(null);
        return () => setTempLine(null);
    }, [player]);

    const position = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);

    const originalPlayerScreenPosition = getScreenCoordinates(
        player.position,
        gridSize,
        mapZoom,
    );
    const positions = getAllPossibleDestinations(position, otherPlayers).map(
        (eachPosition) => {
            return {
                screen: getScreenCoordinates(eachPosition, gridSize, mapZoom),
                position: eachPosition,
            };
        },
    );

    return (
        <div ref={rootElement}>
            {positions.map((eachPosition) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                    key={`${player.id}_${eachPosition.position.x}_${eachPosition.position.y}`}
                    className="movement-picker"
                    style={{
                        left: eachPosition.screen.x,
                        top: eachPosition.screen.y,
                    }}
                    onClick={() => onPositionSelected(eachPosition.position)}
                    onMouseEnter={() => setTempLine(eachPosition.screen)}
                    onMouseLeave={() => setTempLine(eachPosition.null)}
                />
            ))}
            {tempLine && (
                <svg className="movement-picker-temp-line">
                    <PathLine
                        points={[originalPlayerScreenPosition, tempLine]}
                        stroke={player.style.trailColor}
                        strokeWidth={player.style.trailWidth}
                        strokeDasharray="2"
                        fill="none"
                        r={2}
                    />
                </svg>
            )}
        </div>
    );
}

function getAllPossibleDestinations(originalPosition, otherPlayers) {
    const positions = [];
    for (let i = -DISTANCE_TO_MOVE; i <= DISTANCE_TO_MOVE; i += 1) {
        for (let j = -DISTANCE_TO_MOVE; j <= DISTANCE_TO_MOVE; j += 1) {
            positions.push({
                x: originalPosition.x + i,
                y: originalPosition.y + j,
            });
        }
    }
    return positions.filter(
        (position) => !isPositionColliding(position, otherPlayers),
    );
}

function isPositionColliding(position, otherPlayers) {
    return !!otherPlayers
        .map((player) => player.position)
        .find((otherPosition) => isEqual(otherPosition, position));
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    otherPlayers: PropTypes.arrayOf(playerProp).isRequired,
    onPositionSelected: PropTypes.func.isRequired,
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--movement-picker-color', style.dotColor);
    element.style.setProperty(
        '--movement-picker-size',
        `${style.dotSize + 2}px`,
    );
    element.style.setProperty('--movement-picker-border-radius', style.round);
}

export default MovementPicker;
