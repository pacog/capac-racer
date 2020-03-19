/**
 * Creates a pixel geter object that can access pixels of an image
 *
 * @param {HTMLImageElement} img
 * @returns {PixelGetter}
 */
export const createFromImage = (img) => {
    const canvas = document.createElement('canvas');
    const { width, height } = img;

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(img, 0, 0, width, height);

    const rawData = canvas.getContext('2d').getImageData(0, 0, width, height)
        .data;

    return {
        width,
        height,
        getPixel: (x, y) => {
            const basePosition = 4 * (x + y * width);

            return {
                r: rawData[basePosition + 0],
                g: rawData[basePosition + 1],
                b: rawData[basePosition + 2],
                a: rawData[basePosition + 3],
            };
        },
    };
};
