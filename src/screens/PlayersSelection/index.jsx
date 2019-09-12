import React from 'react';
// import { BLUE, GREEN } from 'constants/player-styles';
import './style.css';

// const hardcodedPlayers = [
//     {
//         id: '1',
//         name: 'Player One',
//         position: {
//             x: 6,
//             y: 15,
//         },
//         speed: {
//             x: 1,
//             y: 0,
//         },
//         prevPositions: [
//             {
//                 x: 6,
//                 y: 15,
//             },
//         ],
//         style: BLUE,
//     },
//     // {
//     //     id: '2',
//     //     name: 'Player Dos',
//     //     position: {
//     //         x: 6,
//     //         y: 25,
//     //     },
//     //     speed: {
//     //         x: -1,
//     //         y: -2,
//     //     },
//     //     prevPositions: [
//     //         {
//     //             x: 6,
//     //             y: 25,
//     //         },
//     //     ],
//     //     style: GREEN,
//     // },
// ];

// const hardcodedOrder = ['1'];


function PlayersSelection() {
    return (
        <div className="player-selection-screen">
            <button
                className="main-menu-button"
                type="button"
                onClick={() =>
                    console.log('click2')
                    // dispatch(
                    //     initGameWithConfig({
                    //         players: hardcodedPlayers,
                    //         playerOrder: hardcodedOrder,
                    //         circuit: hardcodedCircuit,
                    //     }),
                    // )
                }
            >
                Start new game
            </button>
        </div>
    );
}

export default PlayersSelection;