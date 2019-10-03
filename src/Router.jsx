import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as screens from 'constants/screens';
import MainMenu from 'screens/MainMenu';
import Game from 'screens/Game';
import CircuitSelection from 'screens/CircuitSelection';
import PlayersSelection from 'screens/PlayersSelection';

const TIME_TO_SHOW_FIRST_SCREEN = 500; // ms
const STATE_CHANGE_TRANSITION_TIME = 3000; // ms

function Router() {
    const [gameReady, setGameReady] = useState(false);
    const currentScreenName = useSelector(
        (state) => state.mainUI.currentScreen,
    );
    useEffect(() => {
        const timeout = setTimeout(() => {
            setGameReady(true);
        }, TIME_TO_SHOW_FIRST_SCREEN);
        return () => clearTimeout(timeout);
    }, []);

    const allScreens = [
        {
            screenName: screens.MAIN_MENU,
            Component: MainMenu,
        },
        {
            screenName: screens.CIRCUIT_SELECTION,
            Component: CircuitSelection,
        },
        {
            screenName: screens.PLAYERS_SELECTION,
            Component: PlayersSelection,
        },
        {
            screenName: screens.GAME,
            Component: Game,
        },
    ];

    return (
        <TransitionGroup className="menu-screen full-screen">
            {allScreens
                .filter(
                    ({ screenName }) =>
                        gameReady && currentScreenName === screenName,
                )
                .map(({ screenName, Component }) => (
                    <CSSTransition
                        key={screenName.toString()}
                        timeout={STATE_CHANGE_TRANSITION_TIME}
                        classNames="fade"
                    >
                        <Component />
                    </CSSTransition>
                ))}
        </TransitionGroup>
    );
}

export default Router;
