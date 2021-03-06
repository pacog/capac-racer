/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import classNames from 'classnames';
import { projectToScreenPosition } from 'store/map/selectors';
import { player as playerProp } from 'components/propTypes';
import { useSelector } from 'react-redux';
import {
    substract,
    add,
    isInsideViewport,
    getClosestPointInsideViewport,
} from 'utils/vector2d';
import './style.css';

const PADDING_FOR_VIEWPORT = { x: 120, y: 100 };

const GameBoardCameraHandler = ({ children, currentPlayer }) => {
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
    const [boardSize, setBoardSize] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const circuitInfo = useSelector((state) => state.game.circuitInfo);
    const playerScreenPosition = useSelector((state) =>
        projectToScreenPosition(state, currentPlayer.position),
    );

    useEffect(() => {
        if (!boardSize || !currentPlayer || !currentPlayer.position) {
            return;
        }
        const viewport = {
            topLeft: substract({ x: 0, y: 0 }, cameraPosition),
            size: boardSize,
        };
        if (
            isInsideViewport(
                playerScreenPosition,
                viewport,
                PADDING_FOR_VIEWPORT,
            )
        ) {
            return;
        }
        const closestPointInViewport = getClosestPointInsideViewport(
            playerScreenPosition,
            viewport,
            PADDING_FOR_VIEWPORT,
        );
        const newCameraMovement = substract(
            closestPointInViewport,
            playerScreenPosition,
        );

        setCameraPosition(add(cameraPosition, newCameraMovement));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayer, boardSize]);

    const handlePointerDown = (event) => {
        setIsDragging(true);
        const coordinates = getCoordinatesFromPointerEvent(event);
        setDragStart(coordinates);
    };
    const handlePointerUp = () => {
        setIsDragging(false);
        setDragStart(null);
    };
    const handlePointerMove = (event) => {
        if (!isDragging || !dragStart) {
            return;
        }
        const cursorPosition = getCoordinatesFromPointerEvent(event);
        const movement = substract(cursorPosition, dragStart);
        setDragStart(cursorPosition);
        setCameraPosition(add(cameraPosition, movement));
    };

    return (
        <div className="game-board">
            <ReactResizeDetector
                handleHeight
                handleWidth
                onResize={(width, height) => {
                    setBoardSize({ width, height });
                }}
            >
                <div
                    className={classNames('game-board-content', {
                        'is-dragging': isDragging,
                    })}
                    style={{
                        width: circuitInfo.width,
                        height: circuitInfo.height,
                        transform: `translate(${cameraPosition.x}px, ${cameraPosition.y}px)`,
                    }}
                    onMouseDown={handlePointerDown}
                    onMouseUp={handlePointerUp}
                    onMouseMove={handlePointerMove}
                    onTouchStart={handlePointerDown}
                    onTouchEnd={handlePointerUp}
                    onTouchMove={handlePointerMove}
                    onTouchCancel={handlePointerUp}
                >
                    {children}
                </div>
            </ReactResizeDetector>
        </div>
    );
};

GameBoardCameraHandler.propTypes = {
    currentPlayer: playerProp,
};

GameBoardCameraHandler.defaultProps = {
    currentPlayer: null,
};

function getCoordinatesFromPointerEvent(event) {
    let eventToUse = event;

    if (event.type === 'touchstart' || event.type === 'touchmove') {
        // eslint-disable-next-line prefer-destructuring
        eventToUse = event.touches[0];
    }
    return {
        x: eventToUse.clientX,
        y: eventToUse.clientY,
    };
}

export default GameBoardCameraHandler;
