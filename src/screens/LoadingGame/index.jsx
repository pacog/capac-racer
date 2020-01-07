import React from 'react';
import classNames from 'classnames';
// import Logo from 'components/Logo';

import './style.css';

const LoadingGame = ({ className }) => {
    return (
        <div className={classNames('full-screen', className)}>
            <div className="loading-game">
                <div className="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
};

export default LoadingGame;
