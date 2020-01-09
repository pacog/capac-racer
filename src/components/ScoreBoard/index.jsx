import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Score } from 'components/propTypes';
import './style.css';

function ScoreBoard({ scores, highlightedScore }) {
    return (
        <div className="score-board">
            {!!scores.length &&
                scores.map((score, index) => (
                    <div
                        className={classNames('score-board-item', {
                            'is-highlighted':
                                highlightedScore &&
                                highlightedScore.id === score.id,
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
};

ScoreBoard.defaultProps = {
    highlightedScore: null,
};

export default ScoreBoard;
