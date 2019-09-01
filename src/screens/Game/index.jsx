import React from 'react';
import GameBoard from 'components/GameBoard';
import PlayerList from 'components/PlayerList';
import GameScreenModals from 'components/GameScreenModals';

import './style.css';

const Game = () => {
    return (
        <div className="App">
            <GameBoard />
            <PlayerList />
            <GameScreenModals />
        </div>
    );
};

export default Game;
