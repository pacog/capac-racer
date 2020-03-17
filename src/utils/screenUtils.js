/**
 *
 * @param {Point} worldPosition
 * @param {number} gridSize
 * @param {number} mapZoom
 * @returns {Point}
 */
export const getScreenCoordinates = (worldPosition, gridSize, mapZoom) => {
    const project = (n) => {
        if (typeof n === 'number') {
            return n * gridSize * mapZoom;
        }
        return n;
    };

    return {
        x: project(worldPosition.x),
        y: project(worldPosition.y),
        dx: project(worldPosition.dx),
        dy: project(worldPosition.dy),
        baseX: project(worldPosition.baseX),
        baseY: project(worldPosition.baseY),
    };
};
