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
import CounterDisplay from 'components/CounterDisplay';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import './style.css';

const GameBoardContents = () => {
    const dispatch = useDispatch();
    const players = useSelector((state) => getAllPlayers(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const circuitInfo = useSelector((state) => state.game.circuitInfo);
    const waitingForPlayerInput = useSelector((state) =>
        isWaitingForPlayerInput(state),
    );

    return (
        <>
            <div
                className="game-board-circuit-bg"
                style={{
                    backgroundImage: `url(${circuitInfo.bgImg})`,
                    backgroundSize: `${circuitInfo.width}px ${circuitInfo.height}px`,
                }}
            />
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
                <>
                    <CounterDisplay counterObject={waitingForPlayerCounter} />
                    <MovementPicker
                        player={currentPlayer}
                        otherPlayers={players.filter(
                            (otherPlayer) =>
                                otherPlayer.id !== currentPlayer.id,
                        )}
                        onPositionSelected={(position) =>
                            dispatch(
                                handlePlayerMovement(currentPlayer, position),
                            )
                        }
                    />
                </>
            )}
        </>
    );
};

GameBoardContents.propTypes = {};

GameBoardContents.defaultProps = {};

export default GameBoardContents;
