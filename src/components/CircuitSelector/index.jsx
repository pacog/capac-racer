/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CircuitSelector({ circuit, onClick }) {
    return (
        <div className="circuit-selector" onClick={onClick}>
            <img
                className="circuit-selector-img"
                src={circuit.bgImg}
                alt={circuit.name}
            />
            <div className="circuit-selector-footer">
                <div className="circuit-selector-name">{circuit.name}</div>
                <div className="circuit-selector-players">
                    {circuit.maxPlayers} players
                </div>
            </div>
        </div>
    );
}

CircuitSelector.propTypes = {
    circuit: PropTypes.shape({
        name: PropTypes.string,
        bgImg: PropTypes.string,
        maxPlayers: PropTypes.number,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CircuitSelector;
