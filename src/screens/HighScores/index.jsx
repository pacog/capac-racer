/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { MAIN_MENU } from 'constants/screens';
import { circuits } from 'constants/circuits';
import Logo from 'components/Logo';
import ScoreBoard from 'components/ScoreBoard';
import './style.css';

const circuitsArray = Object.values(circuits);
const fakeCircuitScores = [
    {
        id: 'asdfasdf23',
        name: 'Aitor Senna',
        turns: 17,
        time: 176,
    },
    {
        id: 'vsdfvsdfv23',
        name: 'Calamardo',
        turns: 19,
        time: 190,
    },
    {
        id: '23fcsadvasd',
        name: 'Groucho',
        turns: 21,
        time: 116,
    },
];
function HighScores() {
    const dispatch = useDispatch();
    const [activeCircuit, setActiveCircuit] = useState(circuitsArray[0]);

    return (
        <div className="full-screen high-scores">
            <div className="menu-header transition-from-top">
                <Logo variant="small" />
                <h1 className="menu-header-title">High scores</h1>
            </div>
            <div className="menu-content transition-from-bottom">
                <div className="high-scores-circuit-tabs">
                    {circuitsArray.map((circuit) => (
                        <div
                            key={circuit.id}
                            className={classNames('high-scores-circuit-tab', {
                                'is-active': circuit.id === activeCircuit.id,
                            })}
                        >
                            <div onClick={() => setActiveCircuit(circuit)}>
                                {circuit.name}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="high-scores-circuit">
                    <ScoreBoard scores={fakeCircuitScores} />
                </div>
            </div>

            <footer className="menu-footer transition-from-bottom">
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
}

export default HighScores;
