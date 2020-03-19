/** @type {Object.<string, CircuitConfig>} */
export const circuits = {
    mouth: {
        id: 'mouth',
        name: 'Mouth',
        collisionImg: `${process.env.PUBLIC_URL}/circuits/circuit1/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}/circuits/circuit1/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp1.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp2.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp3.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp4.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp5.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp6.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp7.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp8.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit1/cp9.png`,
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
        collisionImg: `${process.env.PUBLIC_URL}/circuits/circuit2/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}/circuits/circuit2/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp1.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp2.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp3.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp4.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp5.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp6.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit2/cp7.png`,
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
    rosco: {
        id: 'rosco',
        name: 'Rosco',
        collisionImg: `${process.env.PUBLIC_URL}/circuits/circuit3/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}/circuits/circuit3/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp1.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp2.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp3.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp4.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp5.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp6.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp7.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit3/cp8.png`,
        ],
        maxPlayers: 4,
        startingPositions: [
            {
                x: 33,
                y: 34,
            },
            {
                x: 33,
                y: 33,
            },
            {
                x: 33,
                y: 32,
            },
            {
                x: 33,
                y: 35,
            },
        ],
        initialSpeed: {
            x: -2,
            y: 0,
        },
    },
    horse: {
        id: 'horse',
        name: 'Horse',
        collisionImg: `${process.env.PUBLIC_URL}/circuits/circuit4/collision.png`,
        bgImg: `${process.env.PUBLIC_URL}/circuits/circuit4/bg.png`,
        checkpoints: [
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp1.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp2.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp3.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp4.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp5.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp6.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp7.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp8.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp9.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp10.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp11.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp12.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp13.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp14.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp15.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp16.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp17.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp18.png`,
            `${process.env.PUBLIC_URL}/circuits/circuit4/cp19.png`,
        ],
        maxPlayers: 3,
        startingPositions: [
            {
                x: 26,
                y: 31,
            },
            {
                x: 26,
                y: 32,
            },
            {
                x: 26,
                y: 33,
            },
        ],
        initialSpeed: {
            x: 2,
            y: 0,
        },
    },
};
