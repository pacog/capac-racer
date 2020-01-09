/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import pluralize from 'pluralize';

const NotifyAIGroundedModal = () => {
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShowContent(true), 100);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div className="game-screen-modal game-screen-modal-non-invasive">
            <div
                className={classNames('game-screen-modal-content', {
                    'is-hidden': !showContent,
                })}
            >
                <div>
                    <span className="player-name">{currentPlayer.name}</span> is
                    grounded after a crash.
                </div>
                <div className="secondary-text">
                    ({currentPlayer.turnsGrounded}{' '}
                    {pluralize('turn', currentPlayer.turnsGrounded)} left)
                </div>
            </div>
        </div>
    );
};

export default NotifyAIGroundedModal;
