import React from 'react';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { getScreenCoordinates } from 'utils/screenUtils';

import './style.css';

const DISTANCE_TO_MOVE = 1;

function MovementPicker({ player }) {
    const position = {
        x: player.position.x + player.speed.x,
        y: player.position.y + player.speed.y,
    };
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);

    const positions = getAllPossibleDestinations(position).map((eachPosition) =>
        getScreenCoordinates(eachPosition, gridSize, mapZoom),
    );

    return (
        <>
            {positions.map((eachPosition) => (
                <div
                    key={`${eachPosition.x}_${eachPosition.y}`}
                    className="movement-picker"
                    style={{
                        left: eachPosition.x,
                        top: eachPosition.y,
                    }}
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
};

export default MovementPicker;
