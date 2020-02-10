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
    getSelectedPosition,
    getMovedPixelsSinceLastTurn,
    getPivotForPlayerInScreen,
} from 'store/game/selectors';
import { doesLineCollide } from 'utils/circuit';
import { setPlayerCSSVars, getColorForTempLine } from 'utils/playerPainter';
import { isTouchDevice } from 'utils/is-touch-device';

import './style.css';

function MovementPicker({ player, onPositionSelected, onConfirmSelection }) {
    const rootElement = useRef(null);
    const [tempLine, setTempLine] = useState(null);

    useEffect(() => {
        setPlayerCSSVars(rootElement.current, player.style);
    }, [player.style]);

    const lastMovement = useSelector((state) =>
        getMovedPixelsSinceLastTurn(state, player),
    ) || { x: 0, y: 0 };

    const [translate, setTranslate] = useState(lastMovement);

    useEffect(() => {
        const timeout = setTimeout(() => setTranslate({ x: 0, y: 0 }));

        return () => clearTimeout(timeout);
    }, []);

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

    const nextPivot = useSelector((state) =>
        getPivotForPlayerInScreen(state, player),
    );

    const otherPlayersPosition = useSelector((state) =>
        getOtherPlayersPositionInScreen(state, player.id),
    );

    const selectedPosition = useSelector(getSelectedPosition);
    const selectedPositionScreen = useSelector((state) =>
        projectToScreenPosition(state, selectedPosition),
    );
    const selectButtonPosition = getSelectButtonPosition(possiblePositions);

    const lineToPaint = tempLine || selectedPositionScreen;

    const wouldCollide =
        lineToPaint &&
        doesLineCollide(
            [originalPlayerScreenPosition, lineToPaint],
            circuit,
            otherPlayersPosition,
        );

    return (
        <div
            ref={rootElement}
            className="movement-picker-container"
            style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
            }}
        >
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
                    onMouseLeave={() => setTempLine(null)}
                />
            ))}
            {isTouchDevice && selectedPosition && (
                // eslint-disable-next-line react/button-has-type
                <button
                    className="button button-bg movement-picker-select-button"
                    style={{
                        left: selectButtonPosition.x,
                        top: selectButtonPosition.y,
                    }}
                    onClick={onConfirmSelection}
                >
                    Select
                </button>
            )}
            {lineToPaint && (
                <svg className="movement-picker-temp-line">
                    <PathLine
                        points={[originalPlayerScreenPosition, lineToPaint]}
                        stroke={getColorForTempLine(
                            player,
                            [originalPlayerScreenPosition, lineToPaint],
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
            <svg className="movement-picker-ghost-line">
                <PathLine
                    points={[originalPlayerScreenPosition, nextPivot]}
                    stroke={player.style.trailColor}
                    strokeWidth={player.style.trailWidth}
                    strokeDasharray="1"
                    fill="none"
                    r={2}
                />
            </svg>

            {lineToPaint && wouldCollide && (
                <div
                    className="movement-picker-crash"
                    style={{
                        left: lineToPaint.x,
                        top: lineToPaint.y,
                    }}
                />
            )}
        </div>
    );
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    onPositionSelected: PropTypes.func.isRequired,
    onConfirmSelection: PropTypes.func.isRequired,
};

/**
 * Gets the position to put the button to select (only used for touch devices)
 * Will get the highest y and the mean x
 *
 * @param {Array} possiblePlayerPositions
 * @returns {Point}
 */
function getSelectButtonPosition(possiblePlayerPositions) {
    if (!possiblePlayerPositions || !possiblePlayerPositions.length) {
        return { x: 0, y: 0 };
    }
    const maxY = possiblePlayerPositions.reduce((acc, position) => {
        return Math.max(acc, position.screen.y);
    }, Number.MIN_VALUE);

    const totalX = possiblePlayerPositions.reduce((acc, position) => {
        return position.screen.x + acc;
    }, 0);

    return {
        x: totalX / possiblePlayerPositions.length,
        y: maxY,
    };
}

export default MovementPicker;
