export const keepRequestingFrames = (callback) => {
    let isRunning = true;

    const destroyer = () => {
        isRunning = false;
    };
    const doCallbackAndRequestMore = () => {
        if (isRunning) {
            callback();
            window.requestAnimationFrame(doCallbackAndRequestMore);
        }
    };
    window.requestAnimationFrame(doCallbackAndRequestMore);
    return destroyer;
};
