/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextTurn } from 'store/game/async-actions';
import { getCurrentPlayer } from 'store/game/selectors';

const NotifyCollisionModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="game-screen-modal" onClick={() => dispatch(nextTurn())}>
            <div className="game-screen-modal-content">
                <div>You crashed!</div>
                <div>Turns grounded: {currentPlayer.turnsGrounded}</div>
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
