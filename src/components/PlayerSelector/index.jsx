import React from 'react';
import PropTypes from 'prop-types';
import { selectablePlayer } from 'components/propTypes';
import './style.css';

function PlayerSelector({ player, onRemove, canBeRemoved }) {
    return (
        <>
            <div>
                {player.name} ({player.style.name})
            </div>
            {canBeRemoved && (
                <button type="button" onClick={onRemove}>
                    Delete
                </button>
            )}
        </>
    );
}

PlayerSelector.propTypes = {
    player: selectablePlayer.isRequired,
    onRemove: PropTypes.func.isRequired,
    canBeRemoved: PropTypes.bool.isRequired,
};

export default PlayerSelector;
