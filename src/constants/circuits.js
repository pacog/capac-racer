export const circuits = {
    circuit1: {
        id: 'circuit1',
        name: 'Circuito 1',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit1/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit1/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}circuits/circuit1/cp1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp3.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp4.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp5.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp6.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp7.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp8.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp9.png`,
            `${process.env.PUBLIC_URL}circuits/circuit1/cp10.png`,
        ],
        maxPlayers: 4,
        startingPositions: [
            {
                x: 4,
                y: 23,
            },
            {
                x: 5,
                y: 23,
            },
            {
                x: 6,
                y: 23,
            },
            {
                x: 7,
                y: 23,
            },
        ],
        initialSpeed: {
            x: 0,
            y: -1,
        },
    },
    circuit2: {
        id: 'circuit2',
        name: 'Corto',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit2/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit2/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_3.png`,
        ],

        maxPlayers: 2,
        startingPositions: [
            {
                x: 7,
                y: 15,
            },
            {
                x: 7,
                y: 16,
            },
        ],
        initialSpeed: {
            x: 1,
            y: 0,
        },
    },
    circuit3: {
        id: 'circuit3',
        name: 'Silverstone',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit3/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit3/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}circuits/circuit3/checkpoint_1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit3/checkpoint_2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit3/checkpoint_3.png`,
        ],

        maxPlayers: 2,
        startingPositions: [
            {
                x: 23,
                y: 6,
            },
            {
                x: 24,
                y: 5,
            },
        ],
        initialSpeed: {
            x: 1,
            y: 1,
        },
    },
    circuit4: {
        id: 'circuit4',
        name: 'The worm',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit4/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit4/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}circuits/circuit4/checkpoint_1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/checkpoint_2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/checkpoint_3.png`,
        ],

        maxPlayers: 2,
        startingPositions: [
            {
                x: 25,
                y: 32,
            },
            {
                x: 25,
                y: 33,
            },
        ],
        initialSpeed: {
            x: 1,
            y: 0,
        },
    },
};
