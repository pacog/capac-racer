import React from 'react';
import { useDispatch } from 'react-redux';
import GameBoard from 'components/GameBoard';
import PlayerList from 'components/PlayerList';
import GameScreenModals from 'components/GameScreenModals';
import KeyPressListener from 'components/KeyPressListener';
import WindowBlurListener from 'components/WindowBlurListener';
import {
    tryToToggleInGameMenu,
    tryToShowInGameMenu,
} from 'store/game/async-actions';

import './style.css';

const Game = () => {
    const dispatch = useDispatch();
    return (
        <div className="transition-opacity">
            <KeyPressListener
                keys={{
                    Escape: () => dispatch(tryToToggleInGameMenu()),
                    Space: () => dispatch(tryToToggleInGameMenu()),
                }}
            />
            <WindowBlurListener
                onBlur={() => dispatch(tryToShowInGameMenu())}
            />
            <GameBoard />
            <PlayerList />
            <GameScreenModals />
        </div>
    );
};

export default Game;
