import React from 'react';
import { useSelector } from 'react-redux';
import * as screens from 'constants/screens';
import MainMenu from 'screens/MainMenu';
import Game from 'screens/Game';
import CircuitSelection from 'screens/CircuitSelection';
import PlayersSelection from 'screens/PlayersSelection';

function Router() {
    const screenId = useSelector((state) => state.mainUI.currentScreen);
    switch (screenId) {
        case screens.MAIN_MENU:
            return <MainMenu />;
        case screens.GAME:
            return <Game />;
        case screens.CIRCUIT_SELECTION:
            return <CircuitSelection />;
        case screens.PLAYERS_SELECTION:
            return <PlayersSelection />;
        default:
            return 'error';
    }
}

export default Router;
