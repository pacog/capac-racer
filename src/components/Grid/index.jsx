import React from 'react';
import PropTypes from 'prop-types';
import gridImg from 'assets/grid.png';
import './style.css';

const GRID_IMG_DENSITY = 3;
const GRID_IMG_SIZE = 30;

const Grid = ({ zoom }) => {
    const backgroundSize = (zoom * GRID_IMG_SIZE) / GRID_IMG_DENSITY;
    return (
        <div
            className="grid"
            style={{
                backgroundImage: `url(${gridImg})`,
                backgroundSize: `${backgroundSize}px ${backgroundSize}px`,
            }}
        >
            Grid
        </div>
    );
};

Grid.propTypes = {
    zoom: PropTypes.number.isRequired,
};

Grid.defaultProps = {};

export default Grid;
