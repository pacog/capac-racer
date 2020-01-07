import React from 'react';
import PropTypes from 'prop-types';
import gridImg from 'assets/grid.png';
import './style.css';

const GRID_IMAGE_SIZE = 60; // px

const Grid = ({ zoom, cellSize }) => {
    const GRID_IMG_DENSITY = GRID_IMAGE_SIZE / cellSize;
    const backgroundSize = (zoom * GRID_IMAGE_SIZE) / GRID_IMG_DENSITY;
    return (
        <div
            className="grid"
            style={{
                backgroundImage: `url(${gridImg})`,
                backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
            }}
        />
    );
};

Grid.propTypes = {
    zoom: PropTypes.number.isRequired,
    cellSize: PropTypes.number.isRequired,
};

Grid.defaultProps = {};

export default Grid;
