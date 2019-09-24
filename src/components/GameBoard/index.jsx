import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer } from 'store/game/selectors';
import CounterDisplay from 'components/CounterDisplay';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        <div className="game-board">
            <GameBoardCameraHandler currentPlayer={currentPlayer}>
                <GameBoardContents />
            </GameBoardCameraHandler>
            <CounterDisplay counterObject={waitingForPlayerCounter} />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
