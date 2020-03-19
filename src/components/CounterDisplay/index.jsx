import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class CounterDisplay extends React.Component {
    state = {
        timeLeft: 0,
    };

    /** @type {number} */
    requestRef = null;

    componentDidMount() {
        this.animate();
    }

    componentWillUnmount() {
        if (this.requestRef) {
            cancelAnimationFrame(this.requestRef);
        }
    }

    animate = () => {
        this.setState({
            timeLeft: this.props.counterObject.getTimeLeft(),
        });
        this.requestRef = requestAnimationFrame(this.animate);
    };

    render() {
        return (
            <div className="counter-display">
                <div className="counter-display-text">Time left:</div>
                <div className="counter-display-number">
                    {(this.state.timeLeft / 1000).toFixed(3)}
                </div>
            </div>
        );
    }
}

CounterDisplay.propTypes = {
    counterObject: PropTypes.shape({
        getTimeLeft: PropTypes.func,
    }).isRequired,
};

export default CounterDisplay;
