import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { raceHistory as raceHistoryProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import { PathLine } from 'react-svg-pathline';
import { CAR } from 'constants/player-styles';
import { getPlayerStyleCSS } from 'utils/playerPainter';

import './style.css';

const defaultStyle = CAR;

const ReplayPlayerTrail = ({ raceHistory, isActive }) => {
    const storeState = useSelector((state) => state);

    if (!raceHistory.path.length) {
        return <></>;
    }
    const points = raceHistory.path.map((position) =>
        projectToScreenPosition(storeState, position),
    );

    return (
        <div
            className={classNames('player-trail-container', {
                'is-active': isActive,
            })}
            style={getPlayerStyleCSS(raceHistory)}
        >
            <svg className="player-trail">
                <PathLine
                    points={points}
                    stroke={defaultStyle.trailColor}
                    strokeWidth={defaultStyle.trailWidth}
                    fill="none"
                    r={2}
                />
            </svg>
            {points
                .map((point, index) => {
                    return { ...point, turn: index + 1 };
                })
                .map((point) => (
                    <div
                        key={`${point.x}_${point.y}_${point.turn}`}
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

ReplayPlayerTrail.propTypes = {
    raceHistory: raceHistoryProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default ReplayPlayerTrail;
