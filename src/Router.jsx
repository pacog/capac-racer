import React from 'react';
import { useSelector } from 'react-redux';
import * as screens from 'constants/screens';
import MainMenu from 'screens/MainMenu';
import Game from 'screens/Game';

function Router() {
    const screenId = useSelector((state) => state.mainUI.currentScreen);
    switch (screenId) {
        case screens.MAIN_MENU:
            return <MainMenu />;
        case screens.GAME:
            return <Game />;
        default:
            return 'error';
    }
}

export default Router;
