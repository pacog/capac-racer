/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';

import './style.css';

const DISTANCE_TO_MOVE = 1;

function MovementPicker({ player, onPositionSelected }) {
    const position = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);

    const positions = getAllPossibleDestinations(position).map(
        (eachPosition) => {
            return {
                screen: getScreenCoordinates(eachPosition, gridSize, mapZoom),
                position: eachPosition,
            };
        },
    );

    return (
        <>
            {positions.map((eachPosition) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                    key={`${eachPosition.position.x}_${eachPosition.position.y}`}
                    className="movement-picker"
                    style={{
                        left: eachPosition.screen.x,
                        top: eachPosition.screen.y,
                    }}
                    onClick={() => onPositionSelected(eachPosition.position)}
                />
            ))}
        </>
    );
}

function getAllPossibleDestinations(originalPosition) {
    const positions = [];
    for (let i = -DISTANCE_TO_MOVE; i <= DISTANCE_TO_MOVE; i += 1) {
        for (let j = -DISTANCE_TO_MOVE; j <= DISTANCE_TO_MOVE; j += 1) {
            positions.push({
                x: originalPosition.x + i,
                y: originalPosition.y + j,
            });
        }
    }
    return positions;
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    onPositionSelected: PropTypes.func.isRequired,
};

export default MovementPicker;
