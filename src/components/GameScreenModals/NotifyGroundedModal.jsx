/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceGroundedAndNextTurn } from 'store/game/async-actions';
import { getCurrentPlayer } from 'store/game/selectors';
import pluralize from 'pluralize';

const NotifyGroundedModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className="game-screen-modal"
            onClick={() => dispatch(reduceGroundedAndNextTurn())}
        >
            <div className="game-screen-modal-content">
                <div>
                    <span className="player-name">{currentPlayer.name}</span>,
                    you are grounded because you crashed!
                </div>
                <div className="secondary-text mt-s">
                    ({currentPlayer.turnsGrounded}{' '}
                    {pluralize('turn', currentPlayer.turnsGrounded)} left)
                </div>

                <button
                    className="button game-screen-modal-button"
                    type="button"
                >
                    Next turn
                </button>
            </div>
        </div>
    );
};

export default NotifyGroundedModal;
