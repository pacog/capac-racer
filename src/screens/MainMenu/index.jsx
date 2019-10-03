import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { CIRCUIT_SELECTION } from 'constants/screens';
import Logo from 'components/Logo';

import './style.css';

const MainMenu = ({ className }) => {
    const dispatch = useDispatch();
    return (
        <div className={classNames('full-screen', className)}>
            <div className="main-menu-content">
                <div className="transition-from-left">
                    <Logo />
                </div>

                <div className="main-menu-buttons transition-from-right">
                    <button
                        className="button"
                        type="button"
                        disabled
                        onClick={() => console.log('continue')}
                    >
                        Continue game
                    </button>
                    <button
                        className="button"
                        type="button"
                        onClick={() =>
                            dispatch(changeScreen(CIRCUIT_SELECTION))
                        }
                    >
                        Start new game
                    </button>
                    <button
                        className="button"
                        type="button"
                        disabled
                        onClick={() => console.log('tutorial')}
                    >
                        Tutorial
                    </button>
                    <button
                        className="button"
                        type="button"
                        disabled
                        onClick={() => console.log('credits')}
                    >
                        Credits
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
