import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentPlayer } from 'store/game/selectors';
import { pause } from 'store/game/async-actions';
import CounterDisplay from 'components/CounterDisplay';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        <div className="game-board">
            <GameBoardCameraHandler currentPlayer={currentPlayer}>
                <GameBoardContents />
            </GameBoardCameraHandler>
            <CounterDisplay counterObject={waitingForPlayerCounter} />
            <button
                type="button"
                className="in-game-button pause-button"
                onClick={() => dispatch(pause())}
            >
                Pause
            </button>
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
