/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import { startWaitingForPlayerInput } from 'store/game/async-actions';

const StartTurnModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    return (
        <div
            className="game-screen-modal"
            onClick={() => dispatch(startWaitingForPlayerInput())}
        >
            <div>{currentPlayer.name}, it is your turn</div>
            <button className="game-screen-modal-button" type="button">
                Start my turn
            </button>
        </div>
    );
};

export default StartTurnModal;
