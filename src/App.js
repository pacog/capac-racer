import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from 'store/rootReducer';
import Router from './Router';
import './App.css';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
