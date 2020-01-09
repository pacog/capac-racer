/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishGame } from 'store/game/async-actions';
import { getCurrentPlayer } from 'store/game/selectors';

const NotifyVictoryModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            className="game-screen-modal"
            onClick={() => dispatch(finishGame())}
        >
            <div className="game-screen-modal-content">
                <div>
                    <span className="player-name">{currentPlayer.name}</span>{' '}
                    won!
                </div>
                <button
                    className="button game-screen-modal-button"
                    type="button"
                >
                    Yay!
                </button>
            </div>
        </div>
    );
};

export default NotifyVictoryModal;
