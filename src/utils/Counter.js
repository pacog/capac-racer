export default class Counter {
    constructor() {
        this.initTime = new Date().getTime();
    }

    // pause() {}

    // unpause() {}

    getRemainingTime() {
        const now = new Date().getTime();
        return now - this.initTime;
    }

    destroy() {
        this.initTime = null;
    }
}
