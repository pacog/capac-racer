/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { player as playerProp, Move } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import {
    getOtherPlayersPositionInScreen,
    getPossibleDestinationsForPlayerInScreen,
    getCircuitInfo,
} from 'store/game/selectors';
import { setPlayerCSSVars, getColorForTempLine } from 'utils/playerPainter';
import { pickRandomFromArray } from 'utils/random';
import { SWITCH_RANDOM_SELECTION_EVERY } from 'constants/ux.js';
import './style.css';

function RandomSelectionAnimation({
    player,
    children,
    switchRandomEvery,
    highlightMove,
}) {
    const rootElement = useRef(null);
    const [tempLine, setTempLine] = useState(null);
    const [highlightedPosition, setHighlightedPosition] = useState(null);
    useEffect(() => {
        setPlayerCSSVars(rootElement.current, player.style);
    }, [player.style]);
    useEffect(() => {
        setTempLine(null);
        return () => setTempLine(null);
    }, [player]);

    const circuit = useSelector(getCircuitInfo);
    const originalPlayerScreenPosition = useSelector((state) =>
        projectToScreenPosition(state, player.position),
    );
    const possiblePositions = useSelector((state) =>
        getPossibleDestinationsForPlayerInScreen(state, player),
    );
    useEffect(() => {
        const interval = setInterval(() => {
            const randomPosition = pickRandomFromArray(possiblePositions);
            setHighlightedPosition(randomPosition);
            setTempLine(randomPosition.screen);
        }, switchRandomEvery);
        return () => {
            clearInterval(interval);
        };
    }, [player, possiblePositions, switchRandomEvery]);
    const otherPlayersPosition = useSelector((state) =>
        getOtherPlayersPositionInScreen(state, player.id),
    );
    const moveToHighlight = useSelector((state) =>
        projectToScreenPosition(state, highlightMove),
    );

    return (
        <div ref={rootElement}>
            {children && (
                <div
                    className="random-selection-animation-warning"
                    style={{
                        top: originalPlayerScreenPosition.y,
                        left: originalPlayerScreenPosition.x,
                    }}
                >
                    {children}
                </div>
            )}
            {possiblePositions.map((eachPosition) => {
                const key = getKey(player, eachPosition);
                return (
                    <div
                        key={key}
                        className={classNames('random-selection-animation', {
                            'is-highlighted':
                                !moveToHighlight &&
                                highlightedPosition &&
                                getKey(player, highlightedPosition) === key,
                        })}
                        style={{
                            left: eachPosition.screen.x,
                            top: eachPosition.screen.y,
                        }}
                    />
                );
            })}

            {moveToHighlight && (
                <div
                    className="random-selection-animation-highlighted-move"
                    style={{
                        left: moveToHighlight.x,
                        top: moveToHighlight.y,
                    }}
                />
            )}

            {!moveToHighlight && tempLine && (
                <svg className="random-selection-animation-temp-line">
                    <PathLine
                        points={[originalPlayerScreenPosition, tempLine]}
                        stroke={getColorForTempLine(
                            player,
                            [originalPlayerScreenPosition, tempLine],
                            circuit,
                            otherPlayersPosition,
                        )}
                        strokeWidth={player.style.trailWidth}
                        strokeDasharray="2"
                        fill="none"
                        r={2}
                    />
                </svg>
            )}
        </div>
    );
}

function getKey(player, position) {
    return `${player.id}_${position.position.x}_${position.position.y}`;
}

RandomSelectionAnimation.propTypes = {
    player: playerProp.isRequired,
    children: PropTypes.node,
    switchRandomEvery: PropTypes.number,
    highlightMove: Move,
};

RandomSelectionAnimation.defaultProps = {
    children: null,
    switchRandomEvery: SWITCH_RANDOM_SELECTION_EVERY,
    highlightMove: null,
};

export default RandomSelectionAnimation;
