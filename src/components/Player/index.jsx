import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import PlayerIcon from 'components/PlayerIcon';
import { getPlayerStyleCSS } from 'utils/playerPainter';
import './style.css';

const Player = ({ player, isActive }) => {
    const playerScreenPosition = useSelector((state) =>
        // @ts-ignore
        projectToScreenPosition(state, player.position),
    );
    return (
        <div
            className={classNames('player', {
                'is-active': isActive,
            })}
            style={{
                ...getPlayerStyleCSS(player),
                left: playerScreenPosition.x,
                top: playerScreenPosition.y,
            }}
        >
            <PlayerIcon playerStyle={player.style} />

            {isActive && <div className="player-active-indicator" />}
        </div>
    );
};

Player.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default Player;
