export const getScreenCoordinates = (worldPosition, gridSize, mapZoom) => {
    return {
        x: worldPosition.x * gridSize * mapZoom,
        y: worldPosition.y * gridSize * mapZoom,
    };
};
