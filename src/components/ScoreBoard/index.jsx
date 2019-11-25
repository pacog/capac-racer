import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ScoreBoard({ scores }) {
    return (
        <div className="score-board">
            {!!scores.length &&
                scores.map((score, index) => (
                    <div
                        className="score-board-item"
                        key={`score-board-item-${score.id}`}
                    >
                        {index + 1}. {score.name} - {score.turns} turns -{' '}
                        {score.realTimeUsed.toFixed(2)} seconds
                    </div>
                ))}

            {!scores.length && (
                <div className="score-board-empty">No high scores yet!</div>
            )}
        </div>
    );
}

ScoreBoard.propTypes = {
    scores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            turns: PropTypes.number,
            time: PropTypes.number,
        }),
    ).isRequired,
};

export default ScoreBoard;
