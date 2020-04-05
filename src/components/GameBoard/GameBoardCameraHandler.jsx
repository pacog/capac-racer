/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import classNames from 'classnames';
import { projectToScreenPosition } from 'store/map/selectors';
import {
    player as playerProp,
    Circuit as circuitProp,
    vector2d as vector2dProp,
} from 'components/propTypes';
import { connect } from 'react-redux';
import {
    substract,
    add,
    isInsideViewport,
    getClosestPointInsideViewport,
} from 'utils/vector2d';
import { getCircuitInfo, getCurrentPlayer } from 'store/game/selectors';
import './style.css';

const PADDING_FOR_VIEWPORT = { x: 120, y: 100 };

/**
 * @typedef {object} GameBoardCameraHandlerProps
 * @property {Player} currentPlayer
 * @property {*} children
 * @property {Circuit} circuitInfo
 * @property {Point} playerScreenPosition
 */

class GameBoardCameraHandler extends React.Component {
    state = {
        /** @type {Point} */
        cameraPosition: { x: 0, y: 0 },
        /** @type {{width: number, height: number}} */
        boardSize: null,
        isDragging: false,
        /** @type {Point} */
        dragStart: null,
    };

    /**
     * @type {GameBoardCameraHandlerProps}
     */
    props;

    componentDidUpdate(prevProps) {
        if (this.props.currentPlayer !== prevProps.currentPlayer) {
            if (
                !this.state.boardSize ||
                !this.props.currentPlayer ||
                !this.props.currentPlayer.position
            ) {
                return;
            }
            const viewport = {
                topLeft: substract({ x: 0, y: 0 }, this.state.cameraPosition),
                size: this.state.boardSize,
            };
            if (
                isInsideViewport(
                    this.props.playerScreenPosition,
                    viewport,
                    PADDING_FOR_VIEWPORT,
                )
            ) {
                return;
            }
            const closestPointInViewport = getClosestPointInsideViewport(
                this.props.playerScreenPosition,
                viewport,
                PADDING_FOR_VIEWPORT,
            );
            const newCameraMovement = substract(
                closestPointInViewport,
                this.props.playerScreenPosition,
            );

            const oldCameraPosition = this.state.cameraPosition;

            // TODO find a way of not doing state changes on prop update
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                cameraPosition: add(oldCameraPosition, newCameraMovement),
            });
        }
    }

    handlePointerDown = (event) => {
        const coordinates = getCoordinatesFromPointerEvent(event);
        this.setState({
            isDragging: true,
            dragStart: coordinates,
        });
    };

    handlePointerUp = () => {
        this.setState({
            isDragging: false,
            dragStart: null,
        });
    };

    handlePointerMove = (event) => {
        if (!this.state.isDragging || !this.state.dragStart) {
            return;
        }
        const cursorPosition = getCoordinatesFromPointerEvent(event);
        const movement = substract(cursorPosition, this.state.dragStart);
        const oldCameraPosition = this.state.cameraPosition;

        this.setState({
            dragStart: cursorPosition,
            cameraPosition: add(oldCameraPosition, movement),
        });
    };

    render() {
        return (
            <div className="game-board">
                <ReactResizeDetector
                    handleHeight
                    handleWidth
                    onResize={(width, height) => {
                        this.setState({
                            boardSize: { width, height },
                        });
                    }}
                >
                    <div
                        className={classNames('game-board-content', {
                            'is-dragging': this.state.isDragging,
                        })}
                        style={{
                            width: this.props.circuitInfo.width,
                            height: this.props.circuitInfo.height,
                            transform: `translate(${this.state.cameraPosition.x}px, ${this.state.cameraPosition.y}px)`,
                        }}
                        onMouseDown={this.handlePointerDown}
                        onMouseUp={this.handlePointerUp}
                        onMouseMove={this.handlePointerMove}
                        onTouchStart={this.handlePointerDown}
                        onTouchEnd={this.handlePointerUp}
                        onTouchMove={this.handlePointerMove}
                        onTouchCancel={this.handlePointerUp}
                    >
                        {this.props.children}
                    </div>
                </ReactResizeDetector>
            </div>
        );
    }
}

GameBoardCameraHandler.propTypes = {
    currentPlayer: playerProp,
    children: PropTypes.node,
    circuitInfo: circuitProp,
    playerScreenPosition: vector2dProp,
};

GameBoardCameraHandler.defaultProps = {
    currentPlayer: null,
    children: <></>,
    circuitInfo: null,
    playerScreenPosition: null,
};

const mapStateToProps = (state, ownProps) => {
    const currentPlayer = getCurrentPlayer(state);
    return {
        ...ownProps,
        circuitInfo: getCircuitInfo(state),
        playerScreenPosition: projectToScreenPosition(
            state,
            currentPlayer?.position,
        ),
        currentPlayer,
    };
};

export default connect(mapStateToProps)(GameBoardCameraHandler);

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
