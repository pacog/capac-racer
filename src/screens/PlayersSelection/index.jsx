import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeScreen, setSelectedPlayers } from 'store/main-ui/actions';
import { initGameWithSavedConfig } from 'store/game/async-actions';
import { circuits } from 'constants/circuits';
import { CIRCUIT_SELECTION } from 'constants/screens';
import { getOrderedPlayers } from 'store/game/selectors';
import './style.css';

function PlayersSelection() {
    const dispatch = useDispatch();
    const circuitId = useSelector((state) => state.mainUI.selectedCircuit);
    const players = useSelector(getOrderedPlayers);

    const circuit = circuits[circuitId];

    return (
        <div className="player-selection-screen full-screen">
            <div className="main-menu-section">
                Max player: {circuit.maxPlayers}
                {players.map((player) => (
                    <div key={player.id}>{player.name}</div>
                ))}
            </div>
            <button
                className="main-menu-button"
                type="button"
                onClick={() => {
                    // dispatch(
                    //     setSelectedPlayers(hardcodedPlayers, hardcodedOrder),
                    // );
                    dispatch(initGameWithSavedConfig());
                }}
            >
                Start game!
            </button>
            <button
                className="main-menu-button"
                type="button"
                onClick={() => {
                    dispatch(changeScreen(CIRCUIT_SELECTION));
                }}
            >
                Back
            </button>
        </div>
    );
}

export default PlayersSelection;
