import React, { useState, useEffect } from 'react';
import Countdown from 'components/Countdown';
import { CounterContext } from 'contexts/counter';
import Counter from 'utils/Counter';
import './App.css';

const counter = new Counter({ timeLimit: 3000 });

function App() {
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

    return (
        <CounterContext.Provider value={counter}>
            <div className="App">
                <header className="App-header">
                    <CounterContext.Consumer>
                        {(value) => (
                            <Countdown counter={value} isPaused={isPaused} />
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
            </div>
        </CounterContext.Provider>
    );
}

export default App;
