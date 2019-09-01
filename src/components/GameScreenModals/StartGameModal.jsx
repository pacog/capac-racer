import React from 'react';
import { useDispatch } from 'react-redux';
import { setGameState } from 'store/game/actions';
import * as gameStates from 'constants/game-states';

const StartGameModal = () => {
    const dispatch = useDispatch();
    return (
        <div className="start-modal">
            <button
                type="button"
                onClick={() =>
                    dispatch(setGameState(gameStates.PLAYER_TURN_START_SCREEN))
                }
            >
                Start game!
            </button>
        </div>
    );
};

export default StartGameModal;
