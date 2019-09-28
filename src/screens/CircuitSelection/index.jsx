import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen, setSelectedCircuit } from 'store/main-ui/actions';
import { MAIN_MENU, PLAYERS_SELECTION } from 'constants/screens';
import { circuits } from 'constants/circuits';
import CircuitSelector from 'components/CircuitSelector';
import './style.css';

const circuitsArray = Object.values(circuits);

function CircuitSelection() {
    const dispatch = useDispatch();
    return (
        <div className="circuit-selection-screen full-screen">
            <h1 className="main-menu-title">Select circuit</h1>
            <div className="main-menu-section">
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

            <button
                className="button"
                type="button"
                onClick={() => {
                    dispatch(changeScreen(MAIN_MENU));
                }}
            >
                Back
            </button>
        </div>
    );
}

export default CircuitSelection;
