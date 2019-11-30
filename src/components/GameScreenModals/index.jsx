import React from 'react';
import { useSelector } from 'react-redux';
import * as gameStates from 'constants/game-states';
import { getGameState } from 'store/game/selectors';
import StartGameModal from './StartGameModal';
import StartTurnModal from './StartTurnModal';
import NotifyCollisionModal from './NotifyCollisionModal';
import NotifyGroundedModal from './NotifyGroundedModal';
import NotifyVictoryModal from './NotifyVictoryModal';
import InGameMenuModal from './InGameMenuModal';
import NotifyHighScoreModal from './NotifyHighScoreModal';
import AIThinkingModal from './AIThinkingModal';
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
        case gameStates.NOTIFY_VICTORY:
            return <NotifyVictoryModal />;
        case gameStates.NOTIFY_HIGH_SCORE:
            return <NotifyHighScoreModal />;
        case gameStates.SHOW_MENU:
            return <InGameMenuModal />;
        case gameStates.AI_THINKING_SCREEN:
            return <AIThinkingModal />;
        default:
            return '';
    }
};

GameScreenModals.propTypes = {};

GameScreenModals.defaultProps = {};

export default GameScreenModals;
