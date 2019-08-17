import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as gameStates from 'constants/game-states';
import Countdown from 'components/Countdown';
import { CounterContext } from 'contexts/counter';
import GameBoard from 'components/GameBoard';
import Counter from 'utils/Counter';
import PlayerList from 'components/PlayerList';
import { getGameState } from 'store/game/selectors';
import { setGameState } from 'store/game/actions';
import './style.css';

const counter = new Counter({ timeLimit: 3000 });

const Game = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state) => getGameState(state));
    const [isPaused, setPaused] = useState(false);
    useEffect(() => {
        const destroyer = () => {
            counter.destroy();
        };
        counter.onEnd(() => {
            setPaused(false);
            counter.restart();
        });
        return destroyer;
    }, []);

    const isStartScreenOn = gameState === gameStates.START_SCREEN;

    return (
        <CounterContext.Provider value={counter}>
            <div className="App">
                <GameBoard />
                <PlayerList />
                {isStartScreenOn && (
                    <div className="start-modal">
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(
                                    setGameState(
                                        gameStates.WAITING_FOR_PLAYER_INPUT,
                                    ),
                                )
                            }
                        >
                            Start game!
                        </button>
                    </div>
                )}
                {!isStartScreenOn && (
                    <header className="App-counter">
                        <CounterContext.Consumer>
                            {(value) => (
                                <Countdown
                                    counter={value}
                                    isPaused={isPaused}
                                />
                            )}
                        </CounterContext.Consumer>
                        <CounterContext.Consumer>
                            {(value) => (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (isPaused) {
                                            value.unpause();
                                        } else {
                                            value.pause();
                                        }
                                        setPaused(!isPaused);
                                    }}
                                >
                                    {isPaused ? 'Unpause' : 'pause'}
                                </button>
                            )}
                        </CounterContext.Consumer>
                    </header>
                )}
            </div>
        </CounterContext.Provider>
    );
};

export default Game;
