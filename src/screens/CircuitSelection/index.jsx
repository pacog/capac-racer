import React from 'react';
import { useDispatch } from 'react-redux';
import { changeScreen, setSelectedCircuit } from 'store/main-ui/actions';
import { MAIN_MENU, PLAYERS_SELECTION } from 'constants/screens';
import { circuits } from 'constants/circuits';
import './style.css';

const circuitsArray = Object.values(circuits);

function CircuitSelection() {
    const dispatch = useDispatch();
    return (
        <div className="circuit-selection-screen full-screen">
            <div className="main-menu-section">
                {circuitsArray.map((circuit) => (
                    <button
                        key={circuit.id}
                        className="main-menu-button"
                        type="button"
                        onClick={() => {
                            dispatch(setSelectedCircuit(circuit.id));
                            dispatch(changeScreen(PLAYERS_SELECTION));
                        }}
                    >
                        {circuit.name}
                    </button>
                ))}
            </div>

            <button
                className="main-menu-button"
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
