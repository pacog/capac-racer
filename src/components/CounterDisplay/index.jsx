import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CounterDisplay({ counterObject }) {
    const [timeLeft, setTimeLeft] = React.useState(0);
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef();

    const animate = () => {
        setTimeLeft(counterObject.getTimeLeft());
        requestRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Make sure the effect runs only once

    return (
        <div className="counter-display">{(timeLeft / 1000).toFixed(3)}</div>
    );
}

CounterDisplay.propTypes = {
    counterObject: PropTypes.shape({
        getTimeLeft: PropTypes.func,
    }).isRequired,
};

export default CounterDisplay;
