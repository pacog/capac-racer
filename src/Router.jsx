import React from 'react';
import { useSelector } from 'react-redux';
import { TransitionGroup, Transition } from 'react-transition-group';
import * as screens from 'constants/screens';
import MainMenu from 'screens/MainMenu';
import Game from 'screens/Game';
import CircuitSelection from 'screens/CircuitSelection';
import PlayersSelection from 'screens/PlayersSelection';

const STATE_CHANGE_TRANSITION_TIME = 3000; // ms

function Router() {
    const screenId = useSelector((state) => state.mainUI.currentScreen);

    return (
        <TransitionGroup className="menu-screen full-screen">
            {screenId === screens.MAIN_MENU && (
                <Transition timeout={STATE_CHANGE_TRANSITION_TIME}>
                    {(state) => <MainMenu className={`fade fade-${state}`} />}
                </Transition>
            )}

            {screenId === screens.CIRCUIT_SELECTION && (
                <Transition timeout={STATE_CHANGE_TRANSITION_TIME}>
                    {(state) => (
                        <CircuitSelection className={`fade fade-${state}`} />
                    )}
                </Transition>
            )}

            {screenId === screens.PLAYERS_SELECTION && (
                <Transition timeout={STATE_CHANGE_TRANSITION_TIME}>
                    {(state) => (
                        <PlayersSelection className={`fade fade-${state}`} />
                    )}
                </Transition>
            )}

            {screenId === screens.GAME && (
                <Transition timeout={STATE_CHANGE_TRANSITION_TIME}>
                    {(state) => <Game className={`fade fade-${state}`} />}
                </Transition>
            )}
        </TransitionGroup>
    );
}

export default Router;
