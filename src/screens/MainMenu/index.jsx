import React from 'react';
import { useDispatch } from 'react-redux';
import { initGameWithPlayers } from 'store/game/async-actions';
import { BLUE, GREEN } from 'constants/player-styles';

const hardcodedPlayers = [
    {
        id: '1',
        name: 'Player One',
        position: {
            x: 5,
            y: 25,
        },
        speed: {
            x: -1,
            y: -2,
        },
        prevPositions: [
            {
                x: 5,
                y: 25,
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

const hardcodedOrder = ['2', '1'];

const MainMenu = () => {
    const dispatch = useDispatch();
    return (
        <>
            <h1>Capac Racer</h1>
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        initGameWithPlayers(hardcodedPlayers, hardcodedOrder),
                    )
                }
            >
                Start
            </button>
        </>
    );
};

export default MainMenu;