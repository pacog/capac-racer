import React from 'react';
import { useSelector } from 'react-redux';
import * as gameStates from 'constants/game-states';
import { getGameState } from 'store/game/selectors';
import StartGameModal from './StartGameModal';
import StartTurnModal from './StartTurnModal';
import NotifyCollisionModal from './NotifyCollisionModal';
import NotifyGroundedModal from './NotifyGroundedModal';
import './style.css';

const GameScreenModals = () => {
    const gameState = useSelector((state) => getGameState(state));

    switch (gameState) {
        case gameStates.START_SCREEN:
            return <StartGameModal />;
        case gameStates.PLAYER_TURN_START_SCREEN:
            return <StartTurnModal />;
        case gameStates.NOTIFY_COLLISION:
            return <NotifyCollisionModal />;
        case gameStates.NOTIFY_GROUNDED:
            return <NotifyGroundedModal />;
        default:
            return '';
    }
};

GameScreenModals.propTypes = {};

GameScreenModals.defaultProps = {};

export default GameScreenModals;
