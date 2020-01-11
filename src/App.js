import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from 'store/rootReducer';
import { getSavedPlayers } from 'utils/playersStorage';
import { setSelectedPlayers } from 'store/main-ui/actions';
import Router from './Router';
import './App.css';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

function App() {
    useEffect(() => {
        restoreSavedConfig({ players: getSavedPlayers() });
    }, []);
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

function restoreSavedConfig({ players }) {
    if (players) {
        store.dispatch(
            setSelectedPlayers(players.players, players.playerOrder),
        );
    }
}

export default App;
