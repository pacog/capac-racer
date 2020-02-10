import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { MAIN_MENU } from 'constants/screens';
import Logo from 'components/Logo';
import { changeScreen } from 'store/main-ui/actions';
import TutorialScreen0 from './TutorialScreen0';
import TutorialScreen1 from './TutorialScreen1';
import TutorialScreen2 from './TutorialScreen2';
import TutorialScreen3 from './TutorialScreen3';
import './style.css';

function Tutorial({ className }) {
    const dispatch = useDispatch();
    const [currentScreen, setCurrentScreen] = useState(0);
    const goToNextScreen = () => {
        setCurrentScreen(currentScreen + 1);
    };

    return (
        <div
            className={classNames(
                'full-screen full-screen-with-header-and-footer',
                className,
            )}
        >
            <div className="menu-header transition-from-right">
                <Logo variant="small" />
                <h1 className="menu-header-title">How to play</h1>
            </div>
            <div className="menu-content transition-from-right tutorial-screen-container">
                {currentScreen === 0 && (
                    <TutorialScreen0 onNext={goToNextScreen} />
                )}
                {currentScreen === 1 && (
                    <TutorialScreen1 onNext={goToNextScreen} />
                )}
                {currentScreen === 2 && (
                    <TutorialScreen2 onNext={goToNextScreen} />
                )}
                {currentScreen === 3 && (
                    <TutorialScreen3
                        onNext={() => {
                            dispatch(changeScreen(MAIN_MENU));
                        }}
                    />
                )}
            </div>

            <footer className="menu-footer transition-from-right">
                <button
                    className="button menu-footer-back-button"
                    type="button"
                    onClick={() => {
                        dispatch(changeScreen(MAIN_MENU));
                    }}
                >
                    Back
                </button>
                <div className="menu-footer-filler" />
            </footer>
        </div>
    );
}

export default Tutorial;
