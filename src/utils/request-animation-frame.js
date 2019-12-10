export const waitForNextAnimationFrame = () => {
    return new Promise((resolve) => {
        requestAnimationFrame(resolve);
    });
};
