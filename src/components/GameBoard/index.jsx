import React from 'react';
import Grid from 'components/Grid';
import './style.css';

const GameBoard = () => {
    return (
        <div className="game-board">
            <Grid zoom={1.5} />
        </div>
    );
};

GameBoard.propTypes = {};

GameBoard.defaultProps = {};

export default GameBoard;
