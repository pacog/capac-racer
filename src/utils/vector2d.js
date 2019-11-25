import { clamp } from './clamp';

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

export const magnitude = (v) => {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
};

export const distance = (v1, v2) => {
    return magnitude(substract(v1, v2));
};

export const round = (v1) => {
    return { x: Math.round(v1.x), y: Math.round(v1.y) };
};

export const isInsideViewport = (vector, viewport, padding) => {
    return (
        vector.x >= viewport.topLeft.x + padding.x &&
        vector.x <= viewport.topLeft.x + viewport.size.width - padding.x &&
        vector.y >= viewport.topLeft.y + padding.y &&
        vector.y <= viewport.topLeft.y + viewport.size.height - padding.y
    );
};

export const getClosestPointInsideViewport = (vector, viewport, padding) => {
    const minX = viewport.topLeft.x + padding.x;
    const maxX = viewport.topLeft.x + viewport.size.width - padding.x;
    const minY = viewport.topLeft.y + padding.y;
    const maxY = viewport.topLeft.y + viewport.size.height - padding.y;
    return {
        x: clamp(vector.x, minX, maxX),
        y: clamp(vector.y, minY, maxY),
    };
};
