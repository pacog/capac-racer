import { loadImage } from 'utils/loadImage';

export const createFromConfig = (config) => {
    loadImage(config.bgImg); // Just to preload it
    return loadImage(config.collisionImg).then((collisionImg) => {
        return {
            ...config,
            width: collisionImg.width,
            height: collisionImg.height,
        };
    });
};
