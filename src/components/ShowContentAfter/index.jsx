import React from 'react';
import PropTypes from 'prop-types';

class ShowContentAfter extends React.Component {
    /** @type {number} */
    timeout;

    state = {
        showContent: false,
    };

    componentDidMount() {
        this.timeout = window.setTimeout(
            () => this.setState({ showContent: true }),
            this.props.showAfter,
        );
    }

    componentWillUnmount() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    render() {
        return <>{this.props.render(this.state.showContent)}</>;
    }
}

ShowContentAfter.propTypes = {
    showAfter: PropTypes.number,
    render: PropTypes.func,
};

ShowContentAfter.defaultProps = {
    showAfter: 100, // ms
    render: () => {},
};

export default ShowContentAfter;
