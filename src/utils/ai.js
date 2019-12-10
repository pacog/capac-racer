/* eslint-disable no-loop-func */
import { getPossibleDestinations } from 'store/players/selectors';
import { pickRandomFromArray } from 'utils/random';
import { checkIfPlayerCanMove } from 'utils/circuit';
import aiLevels from 'constants/ai-levels';
import PartialCircuitSolution from './PartialCircuitSolution';
import { waitForNextAnimationFrame } from './request-animation-frame';

export const chooseNextMovement = (
    player,
    otherPlayers,
    circuit,
    zoom,
    gridSize,
) => {
    return new Promise((resolve) => {
        if (shouldGetRandomSolution(player)) {
            resolve(
                returnRandomNonCrashingMove({
                    player,
                    otherPlayers,
                    zoom,
                    circuit,
                    gridSize,
                }),
            );
            return;
        }

        const solutionsGenerator = createSolutionsGenerator({
            player,
            otherPlayers,
            circuit,
            zoom,
            gridSize,
        });

        (async () => {
            // eslint-disable-next-line no-restricted-syntax
            for await (const solution of solutionsGenerator) {
                await waitForNextAnimationFrame();
                if (solution.isFinished) {
                    resolve(solution.move);
                    break;
                }
            }
        })();
    });
};

async function* createSolutionsGenerator({
    player,
    otherPlayers,
    circuit,
    zoom,
    gridSize,
}) {
    let openSolutions = [
        new PartialCircuitSolution(player, 1, circuit, zoom, gridSize),
    ];
    let finishedSolutions = [];
    let bestFinishedSolution = null;

    const { maxIterations } = aiLevels[player.levelAI];
    const { maxThinkingDepth } = aiLevels[player.levelAI];

    let currentIteration = 1;
    const yieldEvery = 50;

    while (openSolutions.length && currentIteration <= maxIterations) {
        currentIteration += 1;
        const solutionToExpand = getMostPromisingSolution(openSolutions);
        openSolutions = openSolutions.filter(
            (solution) => solution !== solutionToExpand,
        );
        const newSolutions = solutionToExpand.expand(
            otherPlayers,
            maxThinkingDepth,
        );
        const newFinishedSolutions = newSolutions.filter((solution) =>
            solution.isFinished(),
        );

        // eslint-disable-next-line no-restricted-syntax
        for (const solution of newFinishedSolutions) {
            if (
                !bestFinishedSolution ||
                solution.getTurns() < bestFinishedSolution.getTurns()
            ) {
                bestFinishedSolution = solution;
            }
        }
        finishedSolutions = finishedSolutions.concat(newFinishedSolutions);
        const newOpenSolutions = newSolutions
            .filter((solution) => !solution.isFinished())
            .filter((solution) => solution.getScore() >= 0)
            .filter(
                // removing solutions with more turns than already found ones
                (solution) =>
                    !bestFinishedSolution ||
                    solution.getTurns() < bestFinishedSolution.getTurns(),
            );

        openSolutions = openSolutions.concat(newOpenSolutions);

        const maxAvgSpeed = openSolutions.reduce(
            (acc, solution) => Math.max(acc, solution.avgSpeed),
            0,
        );
        const maxCheckpointsCoveredPerTurn = openSolutions.reduce(
            (acc, solution) =>
                Math.max(acc, solution.checkpointsCoveredPerTurn),
            0,
        );
        const maxCheckpointsCovered = openSolutions.reduce(
            (acc, solution) => Math.max(acc, solution.checkpointsCovered),
            0,
        );
        openSolutions.forEach((solution) => {
            solution.updateScoreWithTotals({
                maxAvgSpeed,
                maxCheckpointsCoveredPerTurn,
                maxCheckpointsCovered,
            });
        });

        if (currentIteration % yieldEvery === 0) {
            yield {
                isFinished: false,
            };
        }
    }

    let move;
    if (bestFinishedSolution) {
        move = bestFinishedSolution.getFirstMove();
    } else if (openSolutions.length) {
        move = getMostPromisingSolution(openSolutions).getFirstMove();
    } else {
        move = returnRandomMove(player, otherPlayers);
    }
    yield {
        isFinished: true,
        move,
    };
}

function shouldGetRandomSolution(player) {
    const chance = aiLevels[player.levelAI].randomSolutionChance;
    return Math.random() < chance;
}

function returnRandomMove(player, otherPlayers) {
    const positions = getPossibleDestinations(player, otherPlayers);
    return pickRandomFromArray(positions);
}

function returnRandomNonCrashingMove({
    player,
    otherPlayers,
    zoom,
    circuit,
    gridSize,
}) {
    const canMoveThere = (position) =>
        checkIfPlayerCanMove({
            from: player.position,
            to: position,
            zoom,
            gridSize,
            circuit,
            otherPlayers: [],
        });

    let possiblePositions = getPossibleDestinations(
        player,
        otherPlayers,
    ).filter((position) => canMoveThere(position));

    if (!possiblePositions.length) {
        // If we don't have other option other than crashing
        possiblePositions = getPossibleDestinations(player, otherPlayers);
    }

    return pickRandomFromArray(possiblePositions);
}

function getMostPromisingSolution(solutions) {
    return solutions.reduce((best, solution) => {
        if (solution.getScore() > best.getScore()) {
            return solution;
        }
        return best;
    }, solutions[0]);
}
