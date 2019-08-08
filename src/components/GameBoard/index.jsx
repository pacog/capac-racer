import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector, useDispatch } from 'react-redux';
import { moveTo } from 'store/players/actions';
import MovementPicker from 'components/MovementPicker';
import PlayerTrail from 'components/PlayerTrail';

import './style.css';

const GameBoard = () => {
    const playerId = '1';
    const dispatch = useDispatch();
    const player = useSelector((state) => state.players.byId[playerId]);
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);

    return (
        <div className="game-board">
            <Grid zoom={mapZoom} cellSize={gridSize} />
            <Player player={player} />
            <PlayerTrail player={player} />
            <MovementPicker
                player={player}
                onPositionSelected={(position) =>
                    dispatch(moveTo(playerId, position))
                }
            />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
