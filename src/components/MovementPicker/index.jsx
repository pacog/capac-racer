/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import { getOtherPlayersPositionInScreen } from 'store/game/selectors';
import { getPossibleDestinations } from 'store/players/selectors';
import { doesLineCollide } from 'utils/circuit';

import './style.css';

function MovementPicker({ player, onPositionSelected, otherPlayers }) {
    const rootElement = useRef(null);
    const [tempLine, setTempLine] = useState(null);
    useEffect(() => {
        setCSSVars(rootElement.current, player.style);
    }, [player.style]);
    useEffect(() => {
        setTempLine(null);
        return () => setTempLine(null);
    }, [player]);

    const circuit = useSelector((state) => state.game.circuitInfo);
    const storeState = useSelector((state) => state);
    const originalPlayerScreenPosition = useSelector((state) =>
        projectToScreenPosition(state, player.position),
    );
    const positions = getPossibleDestinations(player, otherPlayers).map(
        (eachPosition) => {
            return {
                screen: projectToScreenPosition(storeState, eachPosition),
                position: eachPosition,
            };
        },
    );
    const otherPlayersPosition = useSelector((state) =>
        getOtherPlayersPositionInScreen(state, player.id),
    );

    return (
        <div ref={rootElement}>
            {positions.map((eachPosition) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <div
                    key={`${player.id}_${eachPosition.position.x}_${eachPosition.position.y}`}
                    className="movement-picker"
                    style={{
                        left: eachPosition.screen.x,
                        top: eachPosition.screen.y,
                    }}
                    onClick={() => onPositionSelected(eachPosition.position)}
                    onMouseEnter={() => setTempLine(eachPosition.screen)}
                    onMouseLeave={() => setTempLine(eachPosition.null)}
                />
            ))}
            {tempLine && (
                <svg className="movement-picker-temp-line">
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

function getColorForTempLine(player, points, circuit, otherPlayersPosition) {
    if (doesLineCollide(points, circuit, otherPlayersPosition)) {
        return 'red';
    }
    return player.style.trailColor;
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    otherPlayers: PropTypes.arrayOf(playerProp).isRequired,
    onPositionSelected: PropTypes.func.isRequired,
};

function setCSSVars(element, style) {
    if (!element) {
        return;
    }
    element.style.setProperty('--movement-picker-color', style.dotColor);
    element.style.setProperty(
        '--movement-picker-size',
        `${style.dotSize + 2}px`,
    );
    element.style.setProperty('--movement-picker-border-radius', style.round);
}

export default MovementPicker;
