import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRaceHistory } from 'store/game/selectors';
import GameBoardCameraHandler from 'components/GameBoard/GameBoardCameraHandler';
import { changeScreen } from 'store/main-ui/actions';
import { MAIN_MENU } from 'constants/screens';
import ReplayGameBoardContents from './ReplayGameBoardContents';
import './style.css';

const ReplayGameBoard = () => {
    const raceHistory = useSelector((state) => getRaceHistory(state));
    const [playerInPosition, setPlayerInPosition] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!raceHistory) {
            return;
        }
        setPlayerInPosition({
            id: raceHistory.id,
            name: raceHistory.name,
            style: raceHistory.playerStyle,
            position: raceHistory.path[currentTurn],
            speed: { x: 0, y: 0 },
            prevPositions: [],
        });
    }, [raceHistory, currentTurn]);

    return (
        <div className="game-board-container">
            {playerInPosition && (
                <GameBoardCameraHandler currentPlayer={playerInPosition}>
                    <ReplayGameBoardContents
                        playerInPosition={playerInPosition}
                    />
                </GameBoardCameraHandler>
            )}
            <div className="game-board-back-button-container">
                <button
                    type="button"
                    className="button button-small"
                    onClick={() => dispatch(changeScreen(MAIN_MENU))}
                >
                    Back
                </button>
            </div>
            {raceHistory && raceHistory.path.length && (
                <div className="replay-game-board-turn-selector">
                    <span className="replay-game-board-turn-selector-label">
                        Turn:{' '}
                    </span>
                    <input
                        type="range"
                        value={currentTurn}
                        max={raceHistory.path.length - 1}
                        onChange={(e) =>
                            setCurrentTurn(parseFloat(e.target.value))
                        }
                    />
                    <span className="replay-game-board-turn-selector-value">
                        {currentTurn + 1}
                    </span>
                </div>
            )}
        </div>
    );
};

ReplayGameBoard.propTypes = {};

ReplayGameBoard.defaultProps = {};

export default ReplayGameBoard;
