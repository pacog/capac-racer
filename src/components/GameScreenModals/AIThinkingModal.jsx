import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getCurrentPlayer } from 'store/game/selectors';
import ShowContentAfter from 'components/ShowContentAfter';

const AIThinkingModal = () => {
    const currentPlayer = useSelector(getCurrentPlayer);

    return (
        <ShowContentAfter
            showAfter={1000}
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
                            is choosing its next move...
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default AIThinkingModal;
