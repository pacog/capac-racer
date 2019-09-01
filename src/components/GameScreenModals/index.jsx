import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as gameStates from 'constants/game-states';
import { getGameState, getCurrentPlayer } from 'store/game/selectors';
import { setGameState, nextTurn } from 'store/game/actions';
import { startWaitingForPlayerInput } from 'store/game/async-actions';
import './style.css';

const GameScreenModals = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state) => getGameState(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    const isStartScreenOn = gameState === gameStates.START_SCREEN;
    const showPlayerStartTurnModal =
        gameState === gameStates.PLAYER_TURN_START_SCREEN;
    const isNotifyCollissionScreenOn =
        gameState === gameStates.NOTIFY_COLLISION;
    return (
        <div>
            {isNotifyCollissionScreenOn && (
                <div className="start-modal">
                    You crashed!
                    <button type="button" onClick={() => dispatch(nextTurn())}>
                        Next turn
                    </button>
                </div>
            )}
            {isStartScreenOn && (
                <div className="start-modal">
                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                setGameState(
                                    gameStates.PLAYER_TURN_START_SCREEN,
                                ),
                            )
                        }
                    >
                        Start game!
                    </button>
                </div>
            )}
            {showPlayerStartTurnModal && (
                <div className="start-modal">
                    <div>{currentPlayer.name}, it is your turn</div>
                    <button
                        type="button"
                        onClick={() => dispatch(startWaitingForPlayerInput())}
                    >
                        Start my turn
                    </button>
                </div>
            )}
        </div>
    );
};

GameScreenModals.propTypes = {
    // zoom: PropTypes.number.isRequired,
    // cellSize: PropTypes.number.isRequired,
};

GameScreenModals.defaultProps = {};

export default GameScreenModals;
