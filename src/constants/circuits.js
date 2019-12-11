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
    smiley: {
        id: 'smiley',
        name: 'Smiley',
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
            `${process.env.PUBLIC_URL}circuits/circuit2/cp8.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp9.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp10.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp11.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp12.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp13.png`,
            `${process.env.PUBLIC_URL}circuits/circuit2/cp14.png`,
        ],
        maxPlayers: 3,
        startingPositions: [
            {
                x: 41,
                y: 31,
            },
            {
                x: 41,
                y: 32,
            },
            {
                x: 41,
                y: 33,
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
            `${process.env.PUBLIC_URL}circuits/circuit4/cp1.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp2.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp3.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp4.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp5.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp6.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp7.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp8.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp9.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp10.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp11.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp12.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp13.png`,
            `${process.env.PUBLIC_URL}circuits/circuit4/cp14.png`,
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
