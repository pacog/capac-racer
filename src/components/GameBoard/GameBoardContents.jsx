import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector, useDispatch } from 'react-redux';
import { handlePlayerMovement } from 'store/game/async-actions';
import {
    getCurrentPlayer,
    getAllPlayers,
    isWaitingForPlayerInput,
    isAnimatingRandomSelection,
    isAnimatingAISelection,
} from 'store/game/selectors';
import MovementPicker from 'components/MovementPicker';
import RandomSelectionAnimation from 'components/RandomSelectionAnimation';
import PlayerTrail from 'components/PlayerTrail';
import './style.css';

const GameBoardContents = () => {
    const dispatch = useDispatch();
    const players = useSelector((state) => getAllPlayers(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const circuitInfo = useSelector((state) => state.game.circuitInfo);
    const waitingForPlayerInput = useSelector(isWaitingForPlayerInput);
    const animatingRandomSelection = useSelector(isAnimatingRandomSelection);
    const animatingAISelection = useSelector(isAnimatingAISelection);

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
                    <MovementPicker
                        player={currentPlayer}
                        onPositionSelected={(position) =>
                            dispatch(
                                handlePlayerMovement(currentPlayer, position),
                            )
                        }
                    />
                </>
            )}
            {currentPlayer && animatingRandomSelection && (
                <>
                    <RandomSelectionAnimation player={currentPlayer}>
                        Too late!
                        <br /> Choosing a random move for you...
                    </RandomSelectionAnimation>
                </>
            )}
            {currentPlayer && animatingAISelection && (
                <>
                    <RandomSelectionAnimation
                        player={currentPlayer}
                        switchRandomEvery={350}
                    />
                </>
            )}
        </>
    );
};

GameBoardContents.propTypes = {};

GameBoardContents.defaultProps = {};

export default GameBoardContents;
