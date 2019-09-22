/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeScreen,
    removePlayer,
    updatePlayer,
    toggleRandomizePlayerOrderOnStart,
} from 'store/main-ui/actions';
import { addRandomPlayer } from 'store/main-ui/async-actions';
import { initGameWithSavedConfig } from 'store/game/async-actions';
import { circuits } from 'constants/circuits';
import { CIRCUIT_SELECTION } from 'constants/screens';
import { getOrderedPlayers } from 'store/game/selectors';
import PlayerSelector from 'components/PlayerSelector';
import './style.css';

function PlayersSelection() {
    const dispatch = useDispatch();
    const circuitId = useSelector((state) => state.mainUI.selectedCircuit);
    const randomizePlayerOrderOnStart = useSelector(
        (state) => state.mainUI.randomizePlayerOrderOnStart,
    );

    const players = useSelector(getOrderedPlayers);

    const circuit = circuits[circuitId];

    return (
        <div className="player-selection-screen full-screen">
            <h1 className="main-menu-title">Choose players</h1>
            <div className="main-menu-section">
                {players.map((player) => (
                    <PlayerSelector
                        key={player.id}
                        player={player}
                        onRemove={() => dispatch(removePlayer(player.id))}
                        canBeRemoved={players.length > 1}
                        onNameChange={(newName) =>
                            dispatch(updatePlayer(player.id, { name: newName }))
                        }
                    />
                ))}
                {players.length < circuit.maxPlayers && (
                    <button
                        type="button"
                        className="main-menu-button"
                        onClick={() => dispatch(addRandomPlayer())}
                    >
                        Add Player
                    </button>
                )}
            </div>
            {players.length > 1 && (
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={randomizePlayerOrderOnStart}
                            onChange={() =>
                                dispatch(toggleRandomizePlayerOrderOnStart())
                            }
                        />
                    </label>
                    Randomize player order when race starts
                </div>
            )}
            <button
                className="main-menu-button"
                type="button"
                onClick={() => {
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
