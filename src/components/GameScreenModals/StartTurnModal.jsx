import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import { startWaitingForPlayerInput } from 'store/game/async-actions';

const StartTurnModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    return (
        <div className="start-modal">
            <div>{currentPlayer.name}, it is your turn</div>
            <button
                type="button"
                onClick={() => dispatch(startWaitingForPlayerInput())}
            >
                Start my turn
            </button>
        </div>
    );
};

export default StartTurnModal;
