import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    getCurrentPlayer,
    isWaitingForPlayerInput,
} from 'store/game/selectors';
import { pause } from 'store/game/async-actions';
import CounterDisplay from 'components/CounterDisplay';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import { HUMAN } from 'constants/player-types';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    const waitingForPlayerInput = useSelector(isWaitingForPlayerInput);
    const shouldShowPauseButton =
        !currentPlayer || currentPlayer.type === HUMAN;

    return (
        <div className="game-board-container">
            <GameBoardCameraHandler currentPlayer={currentPlayer}>
                <GameBoardContents />
            </GameBoardCameraHandler>
            {waitingForPlayerInput && (
                <CounterDisplay counterObject={waitingForPlayerCounter} />
            )}
            {shouldShowPauseButton && (
                <div className="pause-button-container">
                    <button
                        type="button"
                        className="button button-small"
                        onClick={() => dispatch(pause())}
                    >
                        Pause
                    </button>
                </div>
            )}
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
