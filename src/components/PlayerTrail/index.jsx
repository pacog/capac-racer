import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import { PathLine } from 'react-svg-pathline';
import { getPlayerStyleCSS } from 'utils/playerPainter';
import './style.css';

const PlayerTrail = ({ player, isActive }) => {
    const storeState = useSelector((state) => state);
    if (!player.prevPositions.length) {
        return <></>;
    }
    const points = player.prevPositions.map((position) =>
        // @ts-ignore
        projectToScreenPosition(storeState, position),
    );
    const pointsWithoutLast = points.slice(0, points.length - 1);
    return (
        <div
            className={classNames('player-trail-container', {
                'is-active': isActive,
            })}
            style={getPlayerStyleCSS(player)}
        >
            <svg className="player-trail">
                <PathLine
                    points={points}
                    // @ts-ignore
                    stroke={player.style.trailColor}
                    strokeWidth={player.style.trailWidth}
                    fill="none"
                    r={2}
                />
            </svg>
            {pointsWithoutLast
                .map((point, index) => {
                    return { ...point, turn: index + 1 };
                })
                .map((point) => (
                    <div
                        key={`${player.id}_${point.x}_${point.y}_${point.turn}`}
                        className="player-trail-point"
                        style={{
                            left: point.x,
                            top: point.y,
                        }}
                    />
                ))}
        </div>
    );
};

PlayerTrail.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default PlayerTrail;
