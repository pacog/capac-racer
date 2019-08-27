let initted = false;
let delta = 0;
let lastFrameTimeMs = 0;
// We want to simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run update()
const timestep = 1000 / 60;

function gameLoop(timestamp) {
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    // Simulate the total elapsed time in fixed-size chunks
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
    }
    requestAnimationFrame(gameLoop);
}

let callbacksToUpdate = [];

function update(timeDiff) {
    callbacksToUpdate.forEach((callback) => callback(timeDiff));
}

export const init = () => {
    if (!initted) {
        requestAnimationFrame(gameLoop);
        initted = true;
    }
};

export const removeFromUpdate = (callback) => {
    callbacksToUpdate = callbacksToUpdate.filter(
        (eachCallback) => callback !== eachCallback,
    );
};

export const addToUpdate = (callback) => {
    callbacksToUpdate = callbacksToUpdate.concat([callback]);
    return () => {
        removeFromUpdate(callback);
    };
};
