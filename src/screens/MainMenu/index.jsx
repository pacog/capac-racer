import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { CIRCUIT_SELECTION } from 'constants/screens';
import './style.css';

const MainMenu = () => {
    const dispatch = useDispatch();
    return (
        <div className="main-menu full-screen">
            <h1 className="main-menu-title">Capac Racer</h1>
            <div className="main-menu-buttons">
                <button
                    className="main-menu-button"
                    type="button"
                    disabled
                    onClick={() => console.log('continue')}
                >
                    Continue game
                </button>
                <button
                    className="main-menu-button"
                    type="button"
                    onClick={() =>
                        dispatch(changeScreen(CIRCUIT_SELECTION))
                    }
                >
                    Start new game
                </button>
                <button
                    className="main-menu-button"
                    type="button"
                    disabled
                    onClick={() => console.log('tutorial')}
                >
                    Tutorial
                </button>
                <button
                    className="main-menu-button"
                    type="button"
                    disabled
                    onClick={() => console.log('credits')}
                >
                    Credits
                </button>
            </div>
        </div>
    );
};

export default MainMenu;
