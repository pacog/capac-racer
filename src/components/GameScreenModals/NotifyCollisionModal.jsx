/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pluralize from 'pluralize';
import { nextTurn } from 'store/game/async-actions';
import { getCurrentPlayer } from 'store/game/selectors';

const NotifyCollisionModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(getCurrentPlayer);
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="game-screen-modal" onClick={() => dispatch(nextTurn())}>
            <div className="game-screen-modal-content">
                <div>You crashed!</div>
                <div className="secondary-text mt-s">
                    (grounded for {currentPlayer.turnsGrounded}{' '}
                    {pluralize('turn', currentPlayer.turnsGrounded)})
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

export default NotifyCollisionModal;
