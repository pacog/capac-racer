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
                        {index + 1}. {score.name} - {score.turns} turns -{' '}
                        {(score.realTimeUsed / 1000).toFixed(2)} seconds
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
