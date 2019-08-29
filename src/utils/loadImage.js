export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const onLoad = () => {
            resolve(img);
        };
        const onError = (error) => {
            reject(error);
        };
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onError, { once: true });
        img.src = url;
    });
};
