/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { player as playerProp } from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import {
    getOtherPlayersPositionInScreen,
    getPossibleDestinationsForPlayerInScreen,
} from 'store/game/selectors';
import { setPlayerCSSVars, getColorForTempLine } from 'utils/playerPainter';

import './style.css';

function MovementPicker({ player, onPositionSelected }) {
    const rootElement = useRef(null);
    const [tempLine, setTempLine] = useState(null);
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

    const otherPlayersPosition = useSelector((state) =>
        getOtherPlayersPositionInScreen(state, player.id),
    );

    return (
        <div ref={rootElement}>
            {possiblePositions.map((eachPosition) => (
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

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    onPositionSelected: PropTypes.func.isRequired,
};

export default MovementPicker;
