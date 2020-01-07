import React from 'react';
import { playerStyle as playerStyleProp } from 'components/propTypes';
import './style.css';

function PlayerIcon({ playerStyle }) {
    return (
        <div
            className="player-icon"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/${playerStyle.icon})`,
            }}
        />
    );
}

PlayerIcon.propTypes = {
    playerStyle: playerStyleProp.isRequired,
};

export default PlayerIcon;
