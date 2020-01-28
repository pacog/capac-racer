import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { MAIN_MENU } from 'constants/screens';
import Logo from 'components/Logo';
import { changeScreen } from 'store/main-ui/actions';
import './style.css';

function Tutorial({ className }) {
    const dispatch = useDispatch();
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
            <div className="menu-content transition-from-right">Tutorial</div>

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
