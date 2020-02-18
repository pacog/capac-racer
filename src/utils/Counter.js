export default class {
    constructor({ timeToWait = 10000, started = false }) {
        this._timeToWait = timeToWait;
        this._isRunning = started;
        this._elapsedTime = 0;
    }

    setTimeToWait(timeToWait = 10000) {
        if (timeToWait <= 0) {
            this._timeToWait = Number.MAX_VALUE;
        }
    }

    notifyTimePassed(time) {
        if (!this._isRunning) {
            return;
        }
        this._elapsedTime += time;
        if (this._elapsedTime >= this._timeToWait) {
            this._callbackOnEnd(this._timeToWait - this._elapsedTime);
            this._isRunning = false;
        }
    }

    restart({ callbackOnEnd = () => {} }) {
        this._elapsedTime = 0;
        this._isRunning = true;
        this._callbackOnEnd = callbackOnEnd;
    }

    pause() {
        this._isRunning = false;
    }

    unpause() {
        this._isRunning = true;
    }

    stop() {
        this._isRunning = false;
        this._callbackOnEnd = null;
    }

    reset() {
        this._elapsedTime = 0;
        this._isRunning = false;
        this._callbackOnEnd = null;
    }

    getTimeLeft() {
        return Math.max(this._timeToWait - this._elapsedTime, 0);
    }

    getTimePassed() {
        return this._elapsedTime;
    }
}
