import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { selectablePlayer } from 'components/propTypes';
import PlayerIcon from 'components/PlayerIcon';
import { HUMAN, AI } from 'constants/player-types';
import './style.css';

function PlayerSelector({
    player,
    onRemove,
    canBeRemoved,
    onNameChange,
    onTypeChange,
    // onLevelAIChange,
}) {
    return (
        <div className="player-selector">
            <div className="player-selector-top">
                <input
                    className="player-selector-input"
                    type="text"
                    value={player.name}
                    onChange={(event) => onNameChange(event.target.value)}
                />
                <div className="player-selector-style-container">
                    <PlayerIcon playerStyle={player.style} />
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
            <div className="player-selector-bottom">
                <button
                    type="button"
                    className={classNames('player-selector-toggle', {
                        'is-selected': player.type === HUMAN,
                    })}
                    onClick={() => onTypeChange(HUMAN)}
                >
                    Human
                </button>
                <button
                    type="button"
                    className={classNames('player-selector-toggle', {
                        'is-selected': player.type === AI,
                    })}
                    onClick={() => onTypeChange(AI)}
                >
                    AI
                </button>
            </div>
        </div>
    );
}

PlayerSelector.propTypes = {
    player: selectablePlayer.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    canBeRemoved: PropTypes.bool.isRequired,
};

export default PlayerSelector;
