import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from 'store/rootReducer';
import Router from './Router';
import './App.css';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
