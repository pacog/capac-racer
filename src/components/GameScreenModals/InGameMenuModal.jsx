/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { unpause } from 'store/game/async-actions';

const InGameMenuModal = () => {
    const dispatch = useDispatch();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="game-screen-modal" onClick={() => dispatch(unpause())}>
            <div>Paused</div>
            <button className="game-screen-modal-button" type="button">
                Continue!
            </button>
        </div>
    );
};

export default InGameMenuModal;
