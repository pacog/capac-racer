/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PathLine } from 'react-svg-pathline';
import { motion } from 'framer-motion';
import {
    player as playerProp,
    vector2d as vector2dProp,
    Circuit as circuitProp,
} from 'components/propTypes';
import { projectToScreenPosition } from 'store/map/selectors';
import {
    getOtherPlayersPositionInScreen,
    getPossibleDestinationsForPlayerInScreen,
    getSelectedPosition,
    getMovedPixelsSinceLastTurn,
    getPivotForPlayerInScreen,
    getCircuitInfo,
} from 'store/game/selectors';
import { doesLineCollide } from 'utils/circuit';
import { getColorForTempLine, getPlayerStyleCSS } from 'utils/playerPainter';
import { isTouchDevice } from 'utils/is-touch-device';
import PossibleDestinations from './PossibleDestinations';

import './style.css';

class MovementPicker extends React.Component {
    state = {
        tempLine: null,
    };

    render() {
        const selectButtonPosition = getSelectButtonPosition(
            this.props.possiblePositions,
        );

        const lineToPaint =
            this.state.tempLine || this.props.selectedPositionScreen;

        const wouldCollide =
            lineToPaint &&
            doesLineCollide(
                [this.props.originalPlayerScreenPosition, lineToPaint],
                this.props.circuit,
                this.props.otherPlayersPosition,
            );
        return (
            <motion.div
                className="movement-picker-container"
                animate={{
                    x: 0,
                    y: 0,
                }}
                initial={{
                    x: this.props.lastMovement.x,
                    y: this.props.lastMovement.y,
                }}
                transition={{ ease: 'easeIn', duration: 0.3 }}
                style={{
                    ...getPlayerStyleCSS(this.props.player),
                }}
            >
                <PossibleDestinations
                    onPositionSelected={this.props.onPositionSelected}
                    onPositionHover={(screenPosition) =>
                        this.setState({ tempLine: screenPosition })
                    }
                    onPositionHoverEnd={() => this.setState({ tempLine: null })}
                    player={this.props.player}
                    possiblePositions={this.props.possiblePositions}
                />
                {isTouchDevice && this.props.selectedPosition && (
                    // eslint-disable-next-line react/button-has-type
                    <button
                        className="button button-bg movement-picker-select-button"
                        style={{
                            left: selectButtonPosition.x,
                            top: selectButtonPosition.y,
                        }}
                        onClick={this.props.onConfirmSelection}
                    >
                        Select
                    </button>
                )}
                {lineToPaint && (
                    <svg className="movement-picker-temp-line">
                        <PathLine
                            points={[
                                this.props.originalPlayerScreenPosition,
                                lineToPaint,
                            ]}
                            // @ts-ignore
                            stroke={getColorForTempLine(
                                this.props.player,
                                [
                                    this.props.originalPlayerScreenPosition,
                                    lineToPaint,
                                ],
                                this.props.circuit,
                                this.props.otherPlayersPosition,
                            )}
                            strokeWidth={this.props.player.style.trailWidth}
                            strokeDasharray="2"
                            fill="none"
                            r={2}
                        />
                    </svg>
                )}
                <svg className="movement-picker-ghost-line">
                    <PathLine
                        points={[
                            this.props.originalPlayerScreenPosition,
                            this.props.nextPivot,
                        ]}
                        // @ts-ignore
                        stroke={this.props.player.style.trailColor}
                        strokeWidth={this.props.player.style.trailWidth}
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
            </motion.div>
        );
    }
}

MovementPicker.propTypes = {
    player: playerProp.isRequired,
    onPositionSelected: PropTypes.func.isRequired,
    onConfirmSelection: PropTypes.func.isRequired,
    lastMovement: vector2dProp,
    circuit: circuitProp.isRequired,
    originalPlayerScreenPosition: circuitProp.isRequired,
    possiblePositions: PropTypes.arrayOf(vector2dProp).isRequired,
    nextPivot: vector2dProp.isRequired,
    otherPlayersPosition: PropTypes.arrayOf(vector2dProp),
    selectedPosition: vector2dProp,
    selectedPositionScreen: vector2dProp,
};

MovementPicker.defaultProps = {
    lastMovement: {
        x: 0,
        y: 0,
    },
    otherPlayersPosition: [],
    selectedPosition: null,
    selectedPositionScreen: null,
};

const mapStateToProps = (state, ownProps) => {
    const selectedPosition = getSelectedPosition(state);
    return {
        ...ownProps,
        lastMovement: getMovedPixelsSinceLastTurn(state, ownProps.player) || {
            x: 0,
            y: 0,
        },
        circuit: getCircuitInfo(state),
        originalPlayerScreenPosition: projectToScreenPosition(
            state,
            ownProps.player.position,
        ),
        possiblePositions: getPossibleDestinationsForPlayerInScreen(
            state,
            ownProps.player,
        ),
        nextPivot: getPivotForPlayerInScreen(state, ownProps.player),
        otherPlayersPosition: getOtherPlayersPositionInScreen(
            state,
            ownProps.player.id,
        ),
        selectedPosition,
        selectedPositionScreen: projectToScreenPosition(
            state,
            selectedPosition,
        ),
    };
};

export default connect(mapStateToProps)(MovementPicker);

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
