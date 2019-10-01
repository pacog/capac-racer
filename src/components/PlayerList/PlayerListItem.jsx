import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { player as playerProp } from 'components/propTypes';

const PlayerListItem = ({ player, isActive }) => {
    const rootElement = useRef(null);
    useEffect(() => {
        setCSSVars(rootElement.current, player.style);
    }, [player.style]);
    return (
        <li
            ref={rootElement}
            className={classNames('player-list-item', {
                'is-active': isActive,
            })}
        >
            <div className="player-list-item-decorator-container">
                <div className="player-list-item-decorator" />
            </div>
            <div>{player.name}</div>
        </li>
    );
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--player-color', style.dotColor);
    element.style.setProperty('--player-size', `${style.dotSize}px`);
    element.style.setProperty('--player-border-radius', style.round);
}

PlayerListItem.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default PlayerListItem;
