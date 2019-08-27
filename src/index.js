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

ReactDOM.render(<App />, document.getElementById('root'));

initGameLoop();
addToGameLoopUpdate((time) => {
    waitingForPlayerCounter.notifyTimePassed(time);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
