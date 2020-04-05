/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import ShowContentAfter from 'components/ShowContentAfter';

const NotifyAICollisionModal = () => {
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
                            has crashed :(
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default NotifyAICollisionModal;
