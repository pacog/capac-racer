import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentPlayer } from 'store/game/selectors';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        <GameBoardCameraHandler currentPlayer={currentPlayer}>
            <GameBoardContents />
        </GameBoardCameraHandler>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
