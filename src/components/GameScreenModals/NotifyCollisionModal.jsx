import React from 'react';
import { useDispatch } from 'react-redux';
import { nextTurn } from 'store/game/actions';

const NotifyCollisionModal = () => {
    const dispatch = useDispatch();
    return (
        <div className="start-modal">
            You crashed!
            <button type="button" onClick={() => dispatch(nextTurn())}>
                Next turn
            </button>
        </div>
    );
};

export default NotifyCollisionModal;
