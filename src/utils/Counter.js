import { keepRequestingFrames } from 'utils/keepRequestingFrames';

export default class Counter {
    constructor({ timeLimit }) {
        this.#timeLimit = timeLimit;
    }

    #timeLimit = null;

    #paused = false;

    #lastTimeStamp = null;

    #elapsedTime = 0;

    #onEachFrame = (timestamp) => {
        if (!this.#lastTimeStamp) {
            this.#lastTimeStamp = timestamp;
        }
        if (!this.#paused) {
            const timeSinceLastTimestamp = timestamp - this.#lastTimeStamp;
            this.#elapsedTime = this.#elapsedTime + timeSinceLastTimestamp;
            if (this.getRemainingTime() === 0) {
                this.pause();
                this.#onEndCallbacks.forEach((callback) => callback());
            }
        }
        this.#lastTimeStamp = timestamp;
    };

    #onEndCallbacks = [];

    #destroyer = keepRequestingFrames(this.#onEachFrame);

    pause() {
        this.#paused = true;
    }

    unpause() {
        this.#paused = false;
    }

    restart() {
        this.#elapsedTime = 0;
        this.unpause();
    }

    onEnd(callback) {
        this.#onEndCallbacks = this.#onEndCallbacks.concat([callback]);
    }

    getRemainingTime() {
        const remaining = this.#timeLimit - this.#elapsedTime;
        return Math.max(remaining, 0);
    }

    destroy() {
        this.#destroyer();
    }
}
