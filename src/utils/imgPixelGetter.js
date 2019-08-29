export const createFromImage = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    return {
        getPixel: (x, y) => {
            const rawData = canvas.getContext('2d').getImageData(x, y, 1, 1)
                .data;
            return {
                r: rawData[0],
                g: rawData[1],
                b: rawData[2],
                a: rawData[3],
            };
        },
    };
};
