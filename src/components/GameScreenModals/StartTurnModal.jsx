/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import { startWaitingForPlayerInput } from 'store/game/async-actions';

const StartTurnModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(getCurrentPlayer);

    return (
        <div
            className="game-screen-modal"
            onClick={() => dispatch(startWaitingForPlayerInput())}
        >
            <div className="game-screen-modal-content">
                <div>
                    <span className="player-name">{currentPlayer.name}</span>,
                    it is your turn
                </div>
                <button
                    className="button game-screen-modal-button"
                    type="button"
                >
                    Start my turn
                </button>
            </div>
        </div>
    );
};

export default StartTurnModal;
