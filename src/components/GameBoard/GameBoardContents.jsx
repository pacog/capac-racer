import React from 'react';
import Grid from 'components/Grid';
import Player from 'components/Player';
import { useSelector, useDispatch } from 'react-redux';
import {
    handlePlayerPositionSelection,
    confirmPositionSelection,
} from 'store/game/async-actions';
import {
    getCurrentPlayer,
    getAllPlayers,
    isWaitingForPlayerInput,
    isAnimatingRandomSelection,
    isAnimatingAISelection,
    getAISelectedMove,
    getCircuitInfo,
} from 'store/game/selectors';
import MovementPicker from 'components/MovementPicker';
import RandomSelectionAnimation from 'components/RandomSelectionAnimation';
import PlayerTrail from 'components/PlayerTrail';
import { getZoom, getGridSize } from 'store/map/selectors';
import './style.css';

const GameBoardContents = () => {
    const dispatch = useDispatch();
    const players = useSelector(getAllPlayers);
    const currentPlayer = useSelector(getCurrentPlayer);
    const mapZoom = useSelector(getZoom);
    const gridSize = useSelector(getGridSize);
    const circuitInfo = useSelector(getCircuitInfo);
    const waitingForPlayerInput = useSelector(isWaitingForPlayerInput);
    const animatingRandomSelection = useSelector(isAnimatingRandomSelection);
    const animatingAISelection = useSelector(isAnimatingAISelection);
    const AIMove = useSelector(getAISelectedMove);

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
                        key={currentPlayer?.id}
                        player={currentPlayer}
                        onPositionSelected={(position) =>
                            dispatch(
                                handlePlayerPositionSelection(
                                    currentPlayer,
                                    position,
                                ),
                            )
                        }
                        onConfirmSelection={() => {
                            dispatch(confirmPositionSelection(currentPlayer));
                        }}
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
                        switchRandomEvery={getRandomSpeedForAI(currentPlayer)}
                        highlightMove={AIMove}
                    />
                </>
            )}
        </>
    );
};

function getRandomSpeedForAI(player) {
    switch (player.levelAI) {
        case 0:
            return 800;
        case 1:
            return 400;
        case 2:
            return 200;
        case 3:
            return 100;
        default:
            return 75;
    }
}

GameBoardContents.propTypes = {};

GameBoardContents.defaultProps = {};

export default GameBoardContents;
