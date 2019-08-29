export const add = (v1, v2) => {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
};

export const substract = (v1, v2) => {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
};

export const scale = (v1, factor) => {
    return { x: v1.x * factor, y: v1.y * factor };
};

export const isEqual = (v1, v2) => {
    return v1.x === v2.x && v1.y === v2.y;
};

export const distance = (v1, v2) => {
    return Math.sqrt((v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2);
};

export const round = (v1) => {
    return { x: Math.round(v1.x), y: Math.round(v1.y) };
};
