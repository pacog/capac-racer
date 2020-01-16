import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRaceHistory } from 'store/game/selectors';
import GameBoardCameraHandler from 'components/GameBoard/GameBoardCameraHandler';
import ReplayGameBoardContents from './ReplayGameBoardContents';
import './style.css';

const ReplayGameBoard = () => {
    const raceHistory = useSelector((state) => getRaceHistory(state));
    const [playerForCamera, setPlayerForCamera] = useState(null);
    const [currentTurn, setCurrentTurn] = useState(0);

    useEffect(() => {
        if (!raceHistory) {
            return;
        }
        setPlayerForCamera({
            id: raceHistory.id,
            name: raceHistory.name,
            style: raceHistory.style,
            position: raceHistory.path[currentTurn],
            speed: { x: 0, y: 0 },
            prevPositions: [],
        });
    }, [raceHistory, currentTurn]);

    return (
        <div className="game-board-container">
            {playerForCamera && (
                <GameBoardCameraHandler currentPlayer={playerForCamera}>
                    <ReplayGameBoardContents />
                </GameBoardCameraHandler>
            )}
        </div>
    );
};

ReplayGameBoard.propTypes = {};

ReplayGameBoard.defaultProps = {};

export default ReplayGameBoard;
