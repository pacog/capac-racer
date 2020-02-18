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
    onLevelAIChange,
    onSelectNewStyle,
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
                <button
                    type="button"
                    className="player-selector-style-container"
                    onClick={onSelectNewStyle}
                >
                    <PlayerIcon playerStyle={player.style} />
                </button>
                <button
                    type="button"
                    className="button button-small"
                    onClick={onRemove}
                    disabled={!canBeRemoved}
                    style={{
                        opacity: canBeRemoved ? 1 : 0,
                    }}
                >
                    Delete
                </button>
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

                {player.type === AI && (
                    <div className="player-selector-ai-level">
                        <input
                            value={player.levelAI}
                            type="range"
                            min="0"
                            max="3"
                            step="1"
                            onChange={(event) =>
                                onLevelAIChange(
                                    parseInt(event.target.value, 10),
                                )
                            }
                        />
                        <div className="player-selector-ai-level-text">
                            {getRobotNameByLevel(player.levelAI)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function getRobotNameByLevel(level) {
    switch (level) {
        case 0:
            return 'Super Easy';
        case 1:
            return 'Very Easy';
        case 2:
            return 'Easy';
        case 3:
            return 'Normal';
        default:
            return 'Normal';
    }
}

PlayerSelector.propTypes = {
    player: selectablePlayer.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onSelectNewStyle: PropTypes.func.isRequired,
    canBeRemoved: PropTypes.bool.isRequired,
};

export default PlayerSelector;
