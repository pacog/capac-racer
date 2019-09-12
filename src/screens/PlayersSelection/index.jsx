import React from 'react';
import { BLUE, GREEN } from 'constants/player-styles';
import { useDispatch } from 'react-redux';
import { changeScreen, setSelectedPlayers } from 'store/main-ui/actions';
import { initGameWithSavedConfig } from 'store/game/async-actions';

import { CIRCUIT_SELECTION } from 'constants/screens';
import './style.css';

const hardcodedPlayers = [
    {
        id: '1',
        name: 'Player One',
        position: {
            x: 6,
            y: 15,
        },
        speed: {
            x: 1,
            y: 0,
        },
        prevPositions: [
            {
                x: 6,
                y: 15,
            },
        ],
        style: BLUE,
    },
    {
        id: '2',
        name: 'Player Dos',
        position: {
            x: 6,
            y: 25,
        },
        speed: {
            x: -1,
            y: -2,
        },
        prevPositions: [
            {
                x: 6,
                y: 25,
            },
        ],
        style: GREEN,
    },
];

const hardcodedOrder = ['1'];

function PlayersSelection() {
    const dispatch = useDispatch();
    return (
        <div className="player-selection-screen full-screen">
            <button
                className="main-menu-button"
                type="button"
                onClick={() => {
                    dispatch(
                        setSelectedPlayers(hardcodedPlayers, hardcodedOrder),
                    );
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
