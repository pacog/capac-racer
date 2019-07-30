import React from 'react';
import Countdown from 'components/Countdown';
import { CounterContext } from 'contexts/counter';
import Counter from 'utils/Counter';
import './App.css';

const counter = new Counter();

function App() {
    return (
        <CounterContext.Provider value={counter}>
            <div className="App">
                <header className="App-header">
                    <CounterContext.Consumer>
                        {(value) => <Countdown counter={value} />}
                    </CounterContext.Consumer>
                </header>
            </div>
        </CounterContext.Provider>
    );
}

export default App;
