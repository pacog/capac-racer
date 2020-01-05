/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeScreen,
    removePlayer,
    updatePlayer,
    toggleRandomizePlayerOrderOnStart,
    limitPlayersTo,
} from 'store/main-ui/actions';
import { addRandomPlayer } from 'store/main-ui/async-actions';
import { initGameWithSavedConfig } from 'store/game/async-actions';
import { circuits } from 'constants/circuits';
import { CIRCUIT_SELECTION } from 'constants/screens';
import { getOrderedPlayers } from 'store/game/selectors';
import PlayerSelector from 'components/PlayerSelector';
import Logo from 'components/Logo';
import './style.css';

function PlayersSelection({ className }) {
    const dispatch = useDispatch();
    const players = useSelector(getOrderedPlayers);
    const circuitId = useSelector((state) => state.mainUI.selectedCircuit);
    const circuit = circuits[circuitId];

    useEffect(() => {
        if (players.length && players.length > circuit.maxPlayers) {
            dispatch(limitPlayersTo(circuit.maxPlayers));
        }
    }, [players, circuit, dispatch]);

    const randomizePlayerOrderOnStart = useSelector(
        (state) => state.mainUI.randomizePlayerOrderOnStart,
    );

    return (
        <div
            className={classNames(
                'full-screen full-screen-with-header-and-footer',
                className,
            )}
        >
            <div className="menu-header transition-from-right">
                <Logo variant="small" />
                <h1 className="menu-header-title">Choose players</h1>
            </div>
            <div className="menu-content player-selection-content transition-from-right">
                <div className="player-selection-content-inner">
                    {players.map((player) => (
                        <PlayerSelector
                            key={player.id}
                            player={player}
                            onRemove={() => dispatch(removePlayer(player.id))}
                            canBeRemoved={players.length > 1}
                            onNameChange={(newName) =>
                                dispatch(
                                    updatePlayer(player.id, { name: newName }),
                                )
                            }
                            onTypeChange={(newType) =>
                                dispatch(
                                    updatePlayer(player.id, { type: newType }),
                                )
                            }
                            onLevelAIChange={(newLevelAI) =>
                                dispatch(
                                    updatePlayer(player.id, {
                                        levelAI: newLevelAI,
                                    }),
                                )
                            }
                        />
                    ))}
                    {players.length < circuit.maxPlayers && (
                        <button
                            type="button"
                            className="button player-selection-add-player-button"
                            onClick={() => dispatch(addRandomPlayer())}
                        >
                            Add Player
                        </button>
                    )}

                    {players.length > 1 && (
                        <div className="transition-from-right">
                            <label className="player-selection-checkbox">
                                <input
                                    type="checkbox"
                                    checked={randomizePlayerOrderOnStart}
                                    onChange={() =>
                                        dispatch(
                                            toggleRandomizePlayerOrderOnStart(),
                                        )
                                    }
                                />
                                Randomize player order when race starts
                            </label>
                        </div>
                    )}
                </div>
            </div>

            <footer className="menu-footer transition-from-right">
                <button
                    className="button menu-footer-back-button"
                    type="button"
                    onClick={() => {
                        dispatch(changeScreen(CIRCUIT_SELECTION));
                    }}
                >
                    Back
                </button>
                <div className="menu-footer-filler" />
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        dispatch(initGameWithSavedConfig());
                    }}
                >
                    Start game!
                </button>
            </footer>
        </div>
    );
}

export default PlayersSelection;
