/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { unpause, finishGame } from 'store/game/async-actions';

const InGameMenuModal = () => {
    const dispatch = useDispatch();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="game-screen-modal" onClick={() => dispatch(unpause())}>
            <div>Paused</div>
            <button className="game-screen-modal-button" type="button">
                Continue!
            </button>

            <button
                className="game-screen-modal-button mt-l"
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    dispatch(finishGame());
                }}
            >
                Exit game
            </button>
        </div>
    );
};

export default InGameMenuModal;
