/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { changeScreen } from 'store/main-ui/actions';
import { MAIN_MENU } from 'constants/screens';
import { circuits } from 'constants/circuits';
import Logo from 'components/Logo';
import ScoreBoard from 'components/ScoreBoard';
import { getByCircuitId } from 'utils/highScoresStorage';
import './style.css';

const circuitsArray = Object.values(circuits);

function HighScores() {
    const [scoresForCurrentCircuit, setScoresForCurrentCircuit] = useState([]);
    const [activeCircuit, setActiveCircuit] = useState(circuitsArray[0]);
    useEffect(() => {
        if (activeCircuit.id) {
            setScoresForCurrentCircuit(getByCircuitId(activeCircuit.id));
        }
    }, [activeCircuit]);

    const dispatch = useDispatch();

    return (
        <div className="full-screen full-screen-with-header-and-footer high-scores">
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
                    <ScoreBoard scores={scoresForCurrentCircuit} />
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
