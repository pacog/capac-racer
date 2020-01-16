import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import GameBoardCameraHandler from 'components/GameBoard/GameBoardCameraHandler';
import ReplayGameBoardContents from './ReplayGameBoardContents';
import './style.css';

const ReplayGameBoard = () => {
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    return (
        <div className="game-board-container">
            <GameBoardCameraHandler currentPlayer={currentPlayer}>
                <ReplayGameBoardContents />
            </GameBoardCameraHandler>
        </div>
    );
};

ReplayGameBoard.propTypes = {};

ReplayGameBoard.defaultProps = {};

export default ReplayGameBoard;
