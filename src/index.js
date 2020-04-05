import 'type-defs';
import React from 'react';
import ReactDOM from 'react-dom';
import waitingForPlayerCounter from 'utils/waitingForPlayerCounter';
import {
    init as initGameLoop,
    addToUpdate as addToGameLoopUpdate,
} from 'utils/gameLoop';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import addVHCSSVar from './utils/add-vh-css-var';

// @ts-ignore
window.capac_racer_version = process.env.REACT_APP_VERSION;

ReactDOM.render(<App />, document.getElementById('root'));

initGameLoop();
addToGameLoopUpdate((time) => {
    waitingForPlayerCounter.notifyTimePassed(time);
});

addVHCSSVar();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
