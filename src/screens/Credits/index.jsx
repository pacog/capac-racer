import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { MAIN_MENU } from 'constants/screens';
import Logo from 'components/Logo';

import './style.css';

const Credits = ({ className }) => {
    const dispatch = useDispatch();
    return (
        <div
            className={classNames(
                'full-screen',
                'full-screen-with-header-and-footer',
                className,
            )}
        >
            <div className="menu-header transition-from-right">
                <Logo variant="small" />
                <h1 className="menu-header-title">Credits</h1>
            </div>
            <div className="menu-content transition-from-right credits-content">
                <div className="credits-content-item">
                    <p>Created by Paco Gómez Granados</p>
                    <p>
                        <a
                            href="https://pacog.github.io/portfolio/"
                            target="_BLANK"
                            rel="noopener noreferrer"
                        >
                            https://pacog.github.io/portfolio/
                        </a>
                    </p>
                    <p>
                        <a
                            href="https://twitter.com/PacoGomezGrana"
                            target="_BLANK"
                            rel="noopener noreferrer"
                        >
                            @PacoGomezGrana
                        </a>
                    </p>
                </div>

                <div className="credits-content-item">
                    <p>Based on an original idea by</p>
                    <p>
                        <a
                            href="https://twitter.com/esqizo"
                            target="_BLANK"
                            rel="noopener noreferrer"
                        >
                            @esqizo
                        </a>{' '}
                        and cousins
                    </p>
                </div>

                <div className="credits-content-item">
                    <p>Circuit graphics inspired by</p>
                    <p>
                        <a
                            href="https://codepen.io/ste-vg"
                            target="_BLANK"
                            rel="noopener noreferrer"
                        >
                            Steve Gardner
                        </a>
                        ´s{' '}
                        <a
                            href="https://codepen.io/ste-vg/full/BaaQamG"
                            target="_BLANK"
                            rel="noopener noreferrer"
                        >
                            Race Car Island
                        </a>
                    </p>
                </div>
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
            </footer>
        </div>
    );
};

export default Credits;
