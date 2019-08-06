import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector } from 'react-redux';

import './style.css';

const GameBoard = () => {
    const player = useSelector((state) => state.players.byId['1']);
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);

    return (
        <div className="game-board">
            <Grid zoom={mapZoom} cellSize={gridSize} />
            <Player player={player} />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
