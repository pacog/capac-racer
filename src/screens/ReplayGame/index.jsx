import React from 'react';
// import { useDispatch } from 'react-redux';
// import GameBoard from 'components/GameBoard';
// import PlayerList from 'components/PlayerList';
// import GameScreenModals from 'components/GameScreenModals';
// import KeyPressListener from 'components/KeyPressListener';
// import WindowBlurListener from 'components/WindowBlurListener';
// import {
//     tryToToggleInGameMenu,
//     tryToShowInGameMenu,
// } from 'store/game/async-actions';
import ReplayGameBoard from 'components/ReplayGameBoard';
import './style.css';

const ReplayGame = () => {
    return (
        <div className="transition-opacity">
            <ReplayGameBoard />
        </div>
    );
};

export default ReplayGame;
