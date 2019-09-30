import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { CIRCUIT_SELECTION } from 'constants/screens';
import Logo from 'components/Logo';

import './style.css';

const MainMenu = () => {
    const dispatch = useDispatch();
    return (
        <div className="menu-screen full-screen">
            <div className="main-menu-content">
                <Logo />

                <div className="main-menu-buttons">
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
