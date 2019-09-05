/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
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
import { substract, add } from 'utils/vector2d';

const GameBoard = () => {
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
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
        <div className="game-board">
            <div
                className="game-board-content"
                style={{
                    width: circuitInfo.width,
                    height: circuitInfo.height,
                    transform: `translate(${cameraPosition.x}px, ${cameraPosition.y}px)`,
                }}
                onMouseDown={(event) => {
                    setIsDragging(true);
                    setDragStart({
                        x: event.clientX,
                        y: event.clientY,
                    });
                }}
                onMouseUp={() => {
                    setIsDragging(false);
                    setDragStart(null);
                }}
                onMouseMove={(event) => {
                    if (!isDragging || !dragStart) {
                        return;
                    }

                    const cursorPosition = {
                        x: event.clientX,
                        y: event.clientY,
                    };
                    const movement = substract(cursorPosition, dragStart);
                    setDragStart(cursorPosition);
                    setCameraPosition(add(cameraPosition, movement));
                }}
            >
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
                        <CounterDisplay
                            counterObject={waitingForPlayerCounter}
                        />
                        <MovementPicker
                            player={currentPlayer}
                            otherPlayers={players.filter(
                                (otherPlayer) =>
                                    otherPlayer.id !== currentPlayer.id,
                            )}
                            onPositionSelected={(position) =>
                                dispatch(
                                    handlePlayerMovement(
                                        currentPlayer,
                                        position,
                                    ),
                                )
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
