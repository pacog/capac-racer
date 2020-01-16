import React from 'react';
import ReplayGameBoard from 'components/ReplayGameBoard';
import './style.css';

const ReplayGame = () => {
    return (
        <div className="transition-opacity">
            <ReplayGameBoard />
        </div>
    );
};

export default ReplayGame;
