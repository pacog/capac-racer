export const keepRequestingFrames = (callback) => {
    let isRunning = true;

    const destroyer = () => {
        isRunning = false;
    };
    const doCallbackAndRequestMore = (timestamp) => {
        if (isRunning) {
            callback(timestamp);
            window.requestAnimationFrame(doCallbackAndRequestMore);
        }
    };
    window.requestAnimationFrame(doCallbackAndRequestMore);
    return destroyer;
};
