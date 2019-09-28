import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Logo({ variant }) {
    return (
        <div className={`logo logo-${variant}`}>
            <div className="logo-up">Capac</div>
            <div className="logo-down">Racer</div>
        </div>
    );
}

Logo.propTypes = {
    variant: PropTypes.oneOf(['big', 'small']),
};

Logo.defaultProps = {
    variant: 'big',
};

export default Logo;
