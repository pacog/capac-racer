import { keepRequestingFrames } from 'utils/keepRequestingFrames';

export default class Counter {
    paused = false;

    lastTimeStamp = null;

    elapsedTime = 0;

    onEachFrame = (timestamp) => {
        if (!this.lastTimeStamp) {
            this.lastTimeStamp = timestamp;
        }
        if (!this.paused) {
            const timeSinceLastTimestamp = timestamp - this.lastTimeStamp;
            this.elapsedTime = this.elapsedTime + timeSinceLastTimestamp;
        }
        this.lastTimeStamp = timestamp;
    };

    destroyer = keepRequestingFrames(this.onEachFrame);

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    getRemainingTime() {
        return this.elapsedTime;
    }

    destroy() {
        this.destroyer();
    }
}
