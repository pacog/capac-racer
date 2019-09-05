/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { substract, add } from 'utils/vector2d';
import './style.css';

const GameBoardCameraHandler = ({ children }) => {
    const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const circuitInfo = useSelector((state) => state.game.circuitInfo);

    return (
        <div className="game-board">
            <div
                className="game-board-content"
                style={{
                    width: circuitInfo.width,
                    height: circuitInfo.height,
                    transform: `translate(${cameraPosition.x}px, ${cameraPosition.y}px)`,
                }}
                onMouseDown={(event) => {
                    setIsDragging(true);
                    setDragStart({
                        x: event.clientX,
                        y: event.clientY,
                    });
                }}
                onMouseUp={() => {
                    setIsDragging(false);
                    setDragStart(null);
                }}
                onMouseMove={(event) => {
                    if (!isDragging || !dragStart) {
                        return;
                    }

                    const cursorPosition = {
                        x: event.clientX,
                        y: event.clientY,
                    };
                    const movement = substract(cursorPosition, dragStart);
                    setDragStart(cursorPosition);
                    setCameraPosition(add(cameraPosition, movement));
                }}
            >
                {children}
            </div>
        </div>
    );
};

GameBoardCameraHandler.propTypes = {};

GameBoardCameraHandler.defaultProps = {};

export default GameBoardCameraHandler;
