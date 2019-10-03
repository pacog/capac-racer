import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { player as playerProp } from 'components/propTypes';
import PlayerIcon from 'components/PlayerIcon';

const PlayerListItem = ({ player, isActive }) => {
    return (
        <li
            className={classNames('player-list-item', {
                'is-active': isActive,
            })}
        >
            <div className="player-list-item-decorator-container">
                <div className="player-list-item-decorator" />
                <PlayerIcon playerStyle={player.style} />
            </div>
            <div>{player.name}</div>
        </li>
    );
};

PlayerListItem.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default PlayerListItem;
