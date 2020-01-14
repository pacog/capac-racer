import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import { PathLine } from 'react-svg-pathline';
import { CAR } from 'constants/player-styles';

import './style.css';

const defaultStyle = CAR;

const ReplayPlayerTrail = ({ player, isActive }) => {
    const rootElement = useRef(null);
    useEffect(() => {
        setCSSVars(rootElement.current, defaultStyle);
    }, []);
    const storeState = useSelector((state) => state);

    if (!player.path.length) {
        return '';
    }
    const points = player.path.map((position) =>
        projectToScreenPosition(storeState, position),
    );

    return (
        <div
            className={classNames('player-trail-container', {
                'is-active': isActive,
            })}
            ref={rootElement}
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

ReplayPlayerTrail.propTypes = {
    player: playerProp.isRequired,
    isActive: PropTypes.bool.isRequired,
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--player-trail-color', style.dotColor);
    element.style.setProperty('--player-trail-size', `${style.dotSize}px`);
    element.style.setProperty('--player-trail-border-radius', style.round);
}

export default ReplayPlayerTrail;
