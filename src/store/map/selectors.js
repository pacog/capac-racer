import { getScreenCoordinates } from 'utils/screenUtils';

export const projectToScreenPosition = (state, worldPosition) => {
    if (!worldPosition) {
        return worldPosition;
    }
    const mapZoom = state.map.zoom;
    const mapGridSize = state.map.gridSize;
    return getScreenCoordinates(worldPosition, mapGridSize, mapZoom);
};
