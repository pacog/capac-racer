/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishGame } from 'store/game/async-actions';
import {
    getCurrentPlayer,
    getLatestHighScore,
    getCircuitInfo,
} from 'store/game/selectors';
import ScoreBoard from 'components/ScoreBoard';
import { getByCircuitId } from 'utils/highScoresStorage';

const NotifyHighScoreModal = () => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(getCurrentPlayer);
    const highScore = useSelector(getLatestHighScore);
    const circuit = useSelector(getCircuitInfo);
    const highScoresForCircuit = getByCircuitId(circuit.id);

    return (
        <div className="game-screen-modal">
            <div className="game-screen-modal-content">
                <div>
                    <span className="player-name">{currentPlayer.name}</span>{' '}
                    won, and set a high score for this circuit!
                </div>
                <div className="notify-high-scores-circuit">
                    <ScoreBoard
                        circuit={circuit}
                        scores={highScoresForCircuit}
                        highlightedScore={highScore}
                    />
                </div>
                <button
                    className="button game-screen-modal-button"
                    type="button"
                    onClick={() => dispatch(finishGame())}
                >
                    Back to main menu
                </button>
            </div>
        </div>
    );
};

export default NotifyHighScoreModal;
