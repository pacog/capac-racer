export default class Counter {
    /**
     *
     * @param {Object} params
     * @param {number} [params.timeToWait=10000]
     * @param {boolean} [params.started=false]
     */
    constructor({ timeToWait = 10000, started = false }) {
        this._timeToWait = timeToWait;
        this._isRunning = started;
    }

    /** @type {number} */
    _timeToWait;

    /** @type {boolean} */
    _isRunning;

    _elapsedTime = 0;

    /**
     * @param {number} [timeToWait=10000]
     */
    setTimeToWait(timeToWait = 10000) {
        if (timeToWait <= 0) {
            this._timeToWait = Number.MAX_VALUE;
        }
    }

    /**
     * @param {number} time
     */
    notifyTimePassed(time) {
        if (!this._isRunning) {
            return;
        }
        this._elapsedTime += time;
        if (this._elapsedTime >= this._timeToWait) {
            this._callbackOnEnd();
            this._isRunning = false;
        }
    }

    /**
     *
     * @param {Object} params
     * @param {Function} params.callbackOnEnd
     */
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
