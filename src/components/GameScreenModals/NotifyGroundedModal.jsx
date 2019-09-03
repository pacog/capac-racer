/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceGroundedAndNextTurn } from 'store/game/async-actions';
import { getCurrentPlayer } from 'store/game/selectors';

const NotifyGroundedModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className="game-screen-modal"
            onClick={() => dispatch(reduceGroundedAndNextTurn())}
        >
            <div>
                {currentPlayer.name}, you are grounded because you crashed!
            </div>
            <div>Turns left: {currentPlayer.turnsGrounded}</div>
            <button className="game-screen-modal-button" type="button">
                Next turn
            </button>
        </div>
    );
};

export default NotifyGroundedModal;
