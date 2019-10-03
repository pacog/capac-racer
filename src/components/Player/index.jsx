import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import PlayerIcon from 'components/PlayerIcon';
import './style.css';

const Player = ({ player, isActive }) => {
    const rootElement = useRef(null);
    // useEffect(() => {
    //     setCSSVars(rootElement.current, player.style);
    // }, [player.style]);
    const playerScreenPosition = useSelector((state) =>
        projectToScreenPosition(state, player.position),
    );
    return (
        <div
            ref={rootElement}
            className={classNames('player', {
                'is-active': isActive,
            })}
            style={{
                left: playerScreenPosition.x,
                top: playerScreenPosition.y,
            }}
        >
            <PlayerIcon playerStyle={player.style} />
        </div>
    );
};

Player.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

// function setCSSVars(element, style) {
//     if (!element) {
//         return;
//     }
//     element.style.setProperty('--player-color', style.dotColor);
//     // element.style.setProperty('--player-size', `${style.dotSize}px`);
//     element.style.setProperty('--player-border-radius', style.round);
// }

// Player.defaultProps = {};

export default Player;
