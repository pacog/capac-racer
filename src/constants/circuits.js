export const circuits = {
    circuit1: {
        id: 'circuit1',
        name: 'Circuito 1',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit1/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit1/bg.png`,
        checkpoint1: `${process.env.PUBLIC_URL}circuits/circuit1/checkpoint_1.png`,
        checkpoint2: `${process.env.PUBLIC_URL}circuits/circuit1/checkpoint_2.png`,
        checkpoint3: `${process.env.PUBLIC_URL}circuits/circuit1/checkpoint_3.png`,
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
        checkpoint1: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_1.png`,
        checkpoint2: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_2.png`,
        checkpoint3: `${process.env.PUBLIC_URL}circuits/circuit2/checkpoint_3.png`,
        maxPlayers: 2,
        startingPositions: [
            {
                x: 5,
                y: 10,
            },
            {
                x: 6,
                y: 10,
            },
        ],
        initialSpeed: {
            x: 1,
            y: 0,
        },
    },
};
