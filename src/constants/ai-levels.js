const levels = [
    {
        // level 0
        randomSolutionChance: 20 / 100,
        maxIterations: 50,
        maxThinkingDepth: 5,
        timeThinking: {
            min: 2500,
            max: 3500,
        },
    },
    {
        // level 1
        randomSolutionChance: 15 / 100,
        maxIterations: 200,
        maxThinkingDepth: 10,
        timeThinking: {
            min: 1500,
            max: 2500,
        },
    },
    {
        // level 2
        randomSolutionChance: 7 / 100,
        maxIterations: 700,
        maxThinkingDepth: 30,
        timeThinking: {
            min: 700,
            max: 2000,
        },
    },
    {
        // level 3
        randomSolutionChance: 0,
        maxIterations: 1500,
        maxThinkingDepth: 99999,
        timeThinking: {
            min: 100,
            max: 300,
        },
    },
];

export default levels;
