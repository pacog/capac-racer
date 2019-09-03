/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { setGameState } from 'store/game/actions';
import * as gameStates from 'constants/game-states';

const StartGameModal = () => {
    const dispatch = useDispatch();
    return (
        <div
            className="game-screen-modal"
            onClick={() =>
                dispatch(setGameState(gameStates.PLAYER_TURN_START_SCREEN))
            }
        >
            <button className="game-screen-modal-button" type="button">
                Start game!
            </button>
        </div>
    );
};

export default StartGameModal;
