export const circuits = {
    mouth: {
        id: 'mouth',
        name: 'The mouth',
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
        ],
        maxPlayers: 3,
        startingPositions: [
            {
                x: 37,
                y: 22,
            },
            {
                x: 37,
                y: 23,
            },
            {
                x: 37,
                y: 24,
            },
        ],
        initialSpeed: {
            x: 2,
            y: 0,
        },
    },
    heart: {
        id: 'heart',
        name: 'Heart',
        collisionImg: `${process.env.PUBLIC_URL}circuits/circuit2/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}circuits/circuit2/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}circuits/circuit2/cp1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp3.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp4.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp5.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp6.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp7.png`,
        ],
        maxPlayers: 3,
        startingPositions: [
            {
                x: 37,
                y: 28,
            },
            {
                x: 36,
                y: 27,
            },
            {
                x: 35,
                y: 26,
            },
        ],
        initialSpeed: {
            x: 2,
            y: -2,
        },
    },
};
