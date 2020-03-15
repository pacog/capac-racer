import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as screens from 'constants/screens';
import MainMenu from 'screens/MainMenu';
import Game from 'screens/Game';
import CircuitSelection from 'screens/CircuitSelection';
import PlayersSelection from 'screens/PlayersSelection';
import HighScores from 'screens/HighScores';
import Credits from 'screens/Credits';
import LoadingGame from 'screens/LoadingGame';
import ReplayGame from 'screens/ReplayGame';
import Tutorial from 'screens/Tutorial';
import { getCurrentScreen } from 'store/main-ui/selectors';

const TIME_TO_SHOW_FIRST_SCREEN = 500; // ms
const STATE_CHANGE_TRANSITION_TIME = 300; // ms

function Router() {
    const [gameReady, setGameReady] = useState(false);
    const currentScreenName = useSelector(getCurrentScreen);
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
            screenName: screens.HIGH_SCORES,
            Component: HighScores,
        },
        {
            screenName: screens.GAME,
            Component: Game,
        },
        {
            screenName: screens.CREDITS,
            Component: Credits,
        },
        {
            screenName: screens.LOADING_GAME,
            Component: LoadingGame,
        },
        {
            screenName: screens.REPLAY_GAME,
            Component: ReplayGame,
        },
        {
            screenName: screens.TUTORIAL,
            Component: Tutorial,
        },
    ];

    return (
        <TransitionGroup className="menu-screen">
            {allScreens
                .filter(
                    ({ screenName }) =>
                        gameReady &&
                        currentScreenName === screenName.toString(),
                )
                .map(({ screenName, Component }) => (
                    <CSSTransition
                        key={screenName.toString()}
                        timeout={STATE_CHANGE_TRANSITION_TIME}
                        classNames="fade"
                    >
                        <Component className="" />
                    </CSSTransition>
                ))}
        </TransitionGroup>
    );
}

export default Router;
