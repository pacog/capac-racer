/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { startTurn } from 'store/game/async-actions';

const StartGameModal = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="game-screen-modal"
            onClick={() => dispatch(startTurn())}
        >
            <div className="game-screen-modal-content">
                Everybody ready?
                <button
                    className="button game-screen-modal-button"
                    type="button"
                >
                    Start game!
                </button>
            </div>
        </div>
    );
};

export default StartGameModal;
