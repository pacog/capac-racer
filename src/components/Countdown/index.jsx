import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { keepRequestingFrames } from 'utils/keepRequestingFrames';

const Countdown = ({ counter, isPaused }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(() => {
        if (isPaused) {
            return () => {};
        }
        const destroyer = keepRequestingFrames(() => {
            setTimeLeft(counter.getRemainingTime());
        });
        return destroyer;
    }, [counter, isPaused]);
    return <div>Time Left: {formatTime(timeLeft)}</div>;
};

function formatTime(time) {
    if (typeof time !== 'number') {
        return '-';
    }
    return (time / 1000).toFixed(3);
}

Countdown.propTypes = {
    counter: PropTypes.object.isRequired,
    isPaused: PropTypes.bool,
};

Countdown.defaultProps = {
    isPaused: false,
};

export default Countdown;
