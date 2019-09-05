import React from 'react';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    return (
        <GameBoardCameraHandler>
            <GameBoardContents />
        </GameBoardCameraHandler>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
