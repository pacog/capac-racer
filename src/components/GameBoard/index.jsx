import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';

import './style.css';

const GRID_SIZE = 10;
const GRID_ZOOM = 1.5;

const GameBoard = () => {
    const playerPosition = { x: 1, y: 2 };
    const playerScreenPosition = {
        x: playerPosition.x * GRID_SIZE * GRID_ZOOM,
        y: playerPosition.y * GRID_SIZE * GRID_ZOOM,
    };
    return (
        <div className="game-board">
            <Grid zoom={GRID_ZOOM} cellSize={GRID_SIZE} />
            <Player x={playerScreenPosition.x} y={playerScreenPosition.y} />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
