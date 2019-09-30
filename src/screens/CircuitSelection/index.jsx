import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen, setSelectedCircuit } from 'store/main-ui/actions';
import { MAIN_MENU, PLAYERS_SELECTION } from 'constants/screens';
import { circuits } from 'constants/circuits';
import CircuitSelector from 'components/CircuitSelector';
import Logo from 'components/Logo';
import './style.css';

const circuitsArray = Object.values(circuits);

function CircuitSelection() {
    const dispatch = useDispatch();
    return (
        <div className="menu-screen full-screen">
            <div className="menu-header">
                <Logo variant="small" />
                <h1 className="menu-header-title">Select circuit</h1>
            </div>
            <div className="menu-content circuit-selection-content">
                <div className="circuit-selection-list">
                    {circuitsArray.map((circuit) => (
                        <CircuitSelector
                            key={circuit.id}
                            onClick={() => {
                                dispatch(setSelectedCircuit(circuit.id));
                                dispatch(changeScreen(PLAYERS_SELECTION));
                            }}
                            circuit={circuit}
                        />
                    ))}
                </div>
            </div>

            <footer className="menu-footer">
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

export default CircuitSelection;
