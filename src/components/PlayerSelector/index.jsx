import React from 'react';
import PropTypes from 'prop-types';
import { selectablePlayer } from 'components/propTypes';

import './style.css';

function PlayerSelector({ player, onRemove, canBeRemoved, onNameChange }) {
    return (
        <div className="player-selector">
            <input
                className="player-selector-input"
                type="text"
                value={player.name}
                onChange={(event) => onNameChange(event.target.value)}
            />
            <div className="player-selector-style-container">
                <div
                    className="player-selector-style"
                    style={{
                        backgroundColor: player.style.dotColor,
                        borderRadius: player.style.round,
                    }}
                />
            </div>
            {canBeRemoved && (
                <button
                    type="button"
                    className="button button-small"
                    onClick={onRemove}
                >
                    Delete
                </button>
            )}
        </div>
    );
}

PlayerSelector.propTypes = {
    player: selectablePlayer.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    canBeRemoved: PropTypes.bool.isRequired,
};

export default PlayerSelector;
