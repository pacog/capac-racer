import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector, useDispatch } from 'react-redux';
import { handlePlayerMovement } from 'store/game/async-actions';
import {
    getCurrentPlayer,
    getAllPlayers,
    isWaitingForPlayerInput,
} from 'store/game/selectors';
import MovementPicker from 'components/MovementPicker';
import PlayerTrail from 'components/PlayerTrail';

import './style.css';

const GameBoard = () => {
    const dispatch = useDispatch();
    const players = useSelector((state) => getAllPlayers(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const waitingForPlayerInput = useSelector((state) =>
        isWaitingForPlayerInput(state),
    );

    return (
        <div className="game-board">
            <Grid zoom={mapZoom} cellSize={gridSize} />
            {players.map((player) => (
                <div key={player.id}>
                    <Player
                        player={player}
                        isActive={player === currentPlayer}
                    />
                    <PlayerTrail
                        player={player}
                        isActive={player === currentPlayer}
                    />
                </div>
            ))}
            {currentPlayer && waitingForPlayerInput && (
                <MovementPicker
                    player={currentPlayer}
                    onPositionSelected={(position) =>
                        dispatch(handlePlayerMovement(currentPlayer, position))
                    }
                />
            )}
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
