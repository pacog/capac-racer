import React from 'react';
import { useDispatch } from 'react-redux';
import { initGameWithConfig } from 'store/game/async-actions';
import { BLUE, GREEN } from 'constants/player-styles';

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
    // {
    //     id: '2',
    //     name: 'Player Dos',
    //     position: {
    //         x: 6,
    //         y: 25,
    //     },
    //     speed: {
    //         x: -1,
    //         y: -2,
    //     },
    //     prevPositions: [
    //         {
    //             x: 6,
    //             y: 25,
    //         },
    //     ],
    //     style: GREEN,
    // },
];

const hardcodedOrder = ['1'];
const hardcodedCircuit = {
    collisionImg: `${process.env.PUBLIC_URL}circuits/circuit2/collision.png`,
    bgImg: `${process.env.PUBLIC_URL}circuits/circuit2/bg.png`,
    checkpoint1: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_1.png`,
    checkpoint2: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_2.png`,
    checkpoint3: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_3.png`,
};

const MainMenu = () => {
    const dispatch = useDispatch();
    return (
        <>
            <h1>Capac Racer</h1>
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        initGameWithConfig({
                            players: hardcodedPlayers,
                            playerOrder: hardcodedOrder,
                            circuit: hardcodedCircuit,
                        }),
                    )
                }
            >
                Start
            </button>
        </>
    );
};

export default MainMenu;
