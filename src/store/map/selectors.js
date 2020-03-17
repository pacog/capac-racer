import { getScreenCoordinates } from 'utils/screenUtils';

/**
 * Gets the current zoom on the map
 *
 * @param {RootState} state
 */
export const getZoom = (state) => state.map.zoom;

/**
 * Gets the current grid size on the map
 *
 * @param {RootState} state
 */
export const getGridSize = (state) => state.map.gridSize;

/**
 * @param {RootState} state
 * @param {Point} worldPosition
 */
export const projectToScreenPosition = (state, worldPosition) => {
    if (!worldPosition) {
        return worldPosition;
    }
    const mapZoom = state.map.zoom;
    const mapGridSize = state.map.gridSize;
    return getScreenCoordinates(worldPosition, mapGridSize, mapZoom);
};
