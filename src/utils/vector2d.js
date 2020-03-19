import { clamp } from './clamp';

/**
 * @param {Point} v1
 * @param {Point} v2
 * @returns {Point}
 */
export const add = (v1, v2) => {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
};

/**
 * @param {Point} v1
 * @param {Point} v2
 * @returns {Point}
 */
export const substract = (v1, v2) => {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
};

/**
 * @param {Point} v1
 * @param {number} factor
 * @returns {Point}
 */
export const scale = (v1, factor) => {
    return { x: v1.x * factor, y: v1.y * factor };
};

/**
 * @param {Point} v1
 * @param {Point} v2
 */
export const isEqual = (v1, v2) => {
    return v1.x === v2.x && v1.y === v2.y;
};

/**
 * @param {Point} v
 * @returns {number}
 */
export const magnitude = (v) => {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
};

/**
 * @param {Point} v1
 * @param {Point} v2
 * @returns {number}
 */
export const distance = (v1, v2) => {
    return magnitude(substract(v1, v2));
};

/**
 * @param {Point} v1
 * @returns {Point}
 */
export const round = (v1) => {
    return { x: Math.round(v1.x), y: Math.round(v1.y) };
};

/**
 * @param {Point} vector
 * @param {Viewport} viewport
 * @param {Point} padding
 */
export const isInsideViewport = (vector, viewport, padding) => {
    return (
        vector.x >= viewport.topLeft.x + padding.x &&
        vector.x <= viewport.topLeft.x + viewport.size.width - padding.x &&
        vector.y >= viewport.topLeft.y + padding.y &&
        vector.y <= viewport.topLeft.y + viewport.size.height - padding.y
    );
};

/**
 * @param {Point} vector
 * @param {Viewport} viewport
 * @param {Point} padding
 * @returns {Point}
 */
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
