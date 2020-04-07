import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { player as playerProp } from 'components/propTypes';

function PossibleDestinations(props) {
    return (
        <>
            {props.possiblePositions.map((eachPosition, index) => (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                <motion.div
                    key={`${props.player.id}_${eachPosition.position.x}_${eachPosition.position.y}`}
                    className={classNames('movement-picker', {
                        'movement-picker-center':
                            !eachPosition.screen.dx && !eachPosition.screen.dy,
                    })}
                    style={{
                        left: eachPosition.screen.baseX,
                        top: eachPosition.screen.baseY,
                    }}
                    animate={{
                        x: eachPosition.screen.dx,
                        y: eachPosition.screen.dy,
                    }}
                    initial={{
                        x: 0,
                        y: 0,
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.3,
                        delay: 0.2 + index * 0.1,
                    }}
                    onClick={() =>
                        props.onPositionSelected(eachPosition.position)
                    }
                    onMouseEnter={() =>
                        props.onPositionHover(eachPosition.screen)
                    }
                    onMouseLeave={props.onPositionHoverEnd}
                />
            ))}
        </>
    );
}

PossibleDestinations.propTypes = {
    onPositionSelected: PropTypes.func.isRequired,
    onPositionHover: PropTypes.func.isRequired,
    onPositionHoverEnd: PropTypes.func.isRequired,
    player: playerProp.isRequired,
    possiblePositions: PropTypes.arrayOf(PropTypes.any).isRequired,
};
PossibleDestinations.defaultProps = {};

export default PossibleDestinations;
