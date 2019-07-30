import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { keepRequestingFrames } from 'utils/keepRequestingFrames';

const Countdown = ({ counter, isPaused }) => {
    useEffect(() => {
        const destroyer = keepRequestingFrames(() => {
            console.log(counter);
        });
        return destroyer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>Countdow 2n</div>;
};

Countdown.propTypes = {
    counter: PropTypes.object.isRequired,
    isPaused: PropTypes.bool,
};

Countdown.defaultProps = {
    isPaused: false,
};

export default Countdown;
