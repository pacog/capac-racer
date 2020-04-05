/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import pluralize from 'pluralize';
import ShowContentAfter from 'components/ShowContentAfter';

const NotifyAIGroundedModal = () => {
    const currentPlayer = useSelector(getCurrentPlayer);

    return (
        <ShowContentAfter
            render={(showContent) => (
                <div className="game-screen-modal game-screen-modal-non-invasive">
                    <div
                        className={classNames('game-screen-modal-content', {
                            'is-hidden': !showContent,
                        })}
                    >
                        <div>
                            <span className="player-name">
                                {currentPlayer.name}
                            </span>{' '}
                            is grounded after a crash.
                        </div>
                        <div className="secondary-text">
                            ({currentPlayer.turnsGrounded}{' '}
                            {pluralize('turn', currentPlayer.turnsGrounded)}{' '}
                            left)
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default NotifyAIGroundedModal;
