import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    getCurrentPlayer,
    isWaitingForPlayerInput,
} from 'store/game/selectors';
import { shouldPlayWithTimer } from 'store/main-ui/selectors';
import { pause } from 'store/game/async-actions';
import CounterDisplay from 'components/CounterDisplay';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import { HUMAN } from 'constants/player-types';
import GameBoardCameraHandler from './GameBoardCameraHandler';
import GameBoardContents from './GameBoardContents';
import './style.css';

const GameBoard = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(getCurrentPlayer);
    const waitingForPlayerInput = useSelector(isWaitingForPlayerInput);
    const playWithTimer = useSelector(shouldPlayWithTimer);
    const shouldShowPauseButton =
        !currentPlayer || currentPlayer.type === HUMAN;

    return (
        <div className="game-board-container">
            <GameBoardCameraHandler>
                <GameBoardContents />
            </GameBoardCameraHandler>
            {waitingForPlayerInput && playWithTimer && (
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
