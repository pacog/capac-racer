import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector } from 'react-redux';

import './style.css';

const GRID_SIZE = 10;

const GameBoard = () => {
    const playerPosition = useSelector((state) => state.players.byId['1']);
    const mapZoom = useSelector((state) => state.map.zoom);
    const playerScreenPosition = {
        x: playerPosition.x * GRID_SIZE * mapZoom,
        y: playerPosition.y * GRID_SIZE * mapZoom,
    };
    return (
        <div className="game-board">
            <Grid zoom={mapZoom} cellSize={GRID_SIZE} />
            <Player x={playerScreenPosition.x} y={playerScreenPosition.y} />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
