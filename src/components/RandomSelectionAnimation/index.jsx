/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import {
    getOtherPlayersPositionInScreen,
    getPossibleDestinationsForPlayerInScreen,
} from 'store/game/selectors';
import { setPlayerCSSVars, getColorForTempLine } from 'utils/playerPainter';
import { pickRandomFromArray } from 'utils/random';
import { SWITCH_RANDOM_SELECTION_EVERY } from 'constants/ux.js';
import './style.css';

function RandomSelectionAnimation({ player }) {
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

    const circuit = useSelector((state) => state.game.circuitInfo);
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
        }, SWITCH_RANDOM_SELECTION_EVERY);
        return () => {
            clearInterval(interval);
        };
    }, [player, possiblePositions]);
    const otherPlayersPosition = useSelector((state) =>
        getOtherPlayersPositionInScreen(state, player.id),
    );

    return (
        <div ref={rootElement}>
            <div
                className="random-selection-animation-warning"
                style={{
                    top: originalPlayerScreenPosition.y,
                    left: originalPlayerScreenPosition.x,
                }}
            >
                Too late!
                <br /> Choosing a random move for you...
            </div>
            {possiblePositions.map((eachPosition) => {
                const key = getKey(player, eachPosition);
                return (
                    <div
                        key={key}
                        className={classNames('random-selection-animation', {
                            'is-highlighted':
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

            {tempLine && (
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
};

export default RandomSelectionAnimation;
