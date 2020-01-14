/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Score, Circuit } from 'components/propTypes';
import { useDispatch } from 'react-redux';
import { showReplay } from 'store/game/async-actions';
import './style.css';

function ScoreBoard({ scores, highlightedScore, canReplay, circuit }) {
    const dispatch = useDispatch();

    const onScoreClicked = (score) => {
        if (!canReplay) {
            return;
        }
        dispatch(showReplay(score, circuit));
    };
    return (
        <div className="score-board">
            {!!scores.length &&
                scores.map((score, index) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div
                        onClick={() => onScoreClicked(score)}
                        className={classNames('score-board-item', {
                            'is-highlighted':
                                highlightedScore &&
                                highlightedScore.id === score.id,
                            'is-clickable': canReplay,
                        })}
                        key={`score-board-item-${score.id}`}
                    >
                        <div className="score-board-item-index">
                            {index + 1}
                        </div>
                        <div className="score-board-item-name">
                            {score.name}
                        </div>
                        <div className="score-board-item-turns">
                            <span className="score-board-item-value">
                                {score.turns}
                            </span>
                            <span className="score-board-item-text">
                                {' '}
                                turns
                            </span>
                        </div>
                        <div className="score-board-item-turns">
                            <span className="score-board-item-value">
                                {score.date?.toLocaleDateString()}
                            </span>
                        </div>

                        <div className="score-board-item-time">
                            (
                            <span className="score-board-item-value">
                                {(score.realTimeUsed / 1000).toFixed(2)}{' '}
                            </span>
                            <span className="score-board-item-text">
                                seconds
                            </span>
                            )
                        </div>
                    </div>
                ))}

            {!scores.length && (
                <div className="score-board-empty">No high scores yet!</div>
            )}
        </div>
    );
}

ScoreBoard.propTypes = {
    scores: PropTypes.arrayOf(Score).isRequired,
    highlightedScore: Score,
    canReplay: PropTypes.bool,
    circuit: Circuit.isRequired,
};

ScoreBoard.defaultProps = {
    highlightedScore: null,
    canReplay: false,
};

export default ScoreBoard;
