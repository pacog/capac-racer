/* eslint-disable no-loop-func */
import { getPossibleDestinations } from 'store/players/selectors';
import { pickRandomFromArray } from 'utils/random';
import {
    checkIfPlayerCanMove,
    getCheckpointsInMovement,
    getDistanceToNextCheckpoint,
    getMaxCheckpointDistance,
} from 'utils/circuit';
import {
    movePlayerTo,
    addCheckpoints,
    doesPlayerHaveRepeatedPositions,
    getAverageSpeed,
    getCheckpointsPassed,
    hasPlayerFinishedRace,
} from 'utils/player';

export const chooseNextMovement = (
    player,
    otherPlayers,
    circuit,
    zoom,
    gridSize,
) => {
    let openSolutions = [
        new PartialCircuitSolution(player, 1, circuit, zoom, gridSize),
    ];
    let finishedSolutions = [];
    let bestFinishedSolution = null;

    const maxIterations = 100;
    let currentIteration = 1;
    while (openSolutions.length && currentIteration <= maxIterations) {
        currentIteration += 1;
        const solutionToExpand = getMostPromisingSolution(openSolutions);
        openSolutions = openSolutions.filter(
            (solution) => solution !== solutionToExpand,
        );
        const newSolutions = solutionToExpand.expand(otherPlayers);
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
    }

    if (bestFinishedSolution) {
        return bestFinishedSolution.getFirstMove();
    }

    if (openSolutions.length) {
        return getMostPromisingSolution(openSolutions).getFirstMove();
    }

    return returnRandomMove(player, otherPlayers);
};

function returnRandomMove(player, otherPlayers) {
    const positions = getPossibleDestinations(player, otherPlayers);
    return pickRandomFromArray(positions);
}

function getMostPromisingSolution(solutions) {
    return solutions.reduce((best, solution) => {
        if (solution.getScore() > best.getScore()) {
            return solution;
        }
        return best;
    }, solutions[0]);
}

class PartialCircuitSolution {
    constructor(playerInfo, currentIteration, circuit, mapZoom, mapGridSize) {
        this.playerInfo = {
            ...playerInfo,
            prevPositions: playerInfo.prevPositions.slice(),
            checkpointsPassed: playerInfo.checkpointsPassed.slice(),
        };
        this.currentIteration = currentIteration;
        this.circuit = circuit;
        this.mapZoom = mapZoom;
        this.mapGridSize = mapGridSize;

        this._updatePartialScore();
    }

    /**
     * Returns an array of all possible solutions from this one
     *
     * @returns {PartialCircuitSolution[]}
     */
    expand(otherPlayers) {
        const otherPlayersToConsider =
            this.currentIteration === 1 ? otherPlayers : [];

        const canMoveThere = (position) =>
            checkIfPlayerCanMove({
                from: this.playerInfo.position,
                to: position,
                zoom: this.mapZoom,
                gridSize: this.mapGridSize,
                circuit: this.circuit,
                otherPlayers: [],
            });

        const possiblePositions = getPossibleDestinations(
            this.playerInfo,
            otherPlayersToConsider,
        ).filter((position) => canMoveThere(position));

        const resultingPlayers = possiblePositions.map((position) => {
            const visitedCheckpointsInTurn = getCheckpointsInMovement({
                from: this.playerInfo.position,
                to: position,
                zoom: this.mapZoom,
                gridSize: this.mapGridSize,
                circuit: this.circuit,
            });

            const player = movePlayerTo(this.playerInfo, position, 0);
            return addCheckpoints(player, visitedCheckpointsInTurn);
        });

        return resultingPlayers.map((player) => {
            return new PartialCircuitSolution(
                player,
                this.currentIteration + 1,
                this.circuit,
                this.mapZoom,
                this.mapGridSize,
            );
        });
    }

    updateScoreWithTotals({
        maxAvgSpeed,
        maxCheckpointsCoveredPerTurn,
        maxCheckpointsCovered,
    }) {
        this.avgSpeedScore = (this.avgSpeed + 1) / (maxAvgSpeed + 1);
        this.checkpointsCoveredPerTurnScore =
            (this.checkpointsCoveredPerTurn + 1) /
            (maxCheckpointsCoveredPerTurn + 1);
        this.checkpointsCoveredScore =
            (this.checkpointsCovered + 1) / (maxCheckpointsCovered + 1);

        this.score =
            this.avgSpeedScore * 0.1 +
            this.checkpointsCoveredPerTurnScore * 0.3 +
            this.checkpointsCoveredScore * 0.6;

        this.summary = {
            avgSpeedScore: this.avgSpeedScore.toFixed(2),
            checkpointsCoveredPerTurnScore: this.checkpointsCoveredPerTurnScore.toFixed(
                2,
            ),
            checkpointsCoveredScore: this.checkpointsCoveredScore.toFixed(2),
        };
    }

    _updatePartialScore() {
        if (!this.playerInfo.prevPositions.length) {
            this.score = -1;
            return;
        }
        if (doesPlayerHaveRepeatedPositions(this.playerInfo)) {
            // we really don't want a path going to the same point again
            this.score = -1000;
            return;
        }

        this.avgSpeed = getAverageSpeed(this.playerInfo);
        const checkpoints = getCheckpointsPassed(this.playerInfo);
        const nextCheckpoint = 1 - this._getPercentageToNextCheckpoint();
        this.checkpointsCovered = checkpoints + nextCheckpoint;
        this.checkpointsCoveredPerTurn =
            (this.checkpointsCovered + 1) / (this.getTurns() + 1);
    }

    getScore() {
        return this.score;
    }

    getFirstMove() {
        const indexWithFirstPosition =
            this.playerInfo.prevPositions.length - this.currentIteration + 1;
        return this.playerInfo.prevPositions[indexWithFirstPosition];
    }

    getTurns() {
        return this.playerInfo.prevPositions.length;
    }

    isFinished() {
        return hasPlayerFinishedRace(this.playerInfo);
    }

    _getPercentageToNextCheckpoint() {
        const distanceToNext = getDistanceToNextCheckpoint({
            player: this.playerInfo,
            zoom: this.mapZoom,
            gridSize: this.mapGridSize,
            circuit: this.circuit,
        });
        const maxCPDistance = getMaxCheckpointDistance(this.circuit);
        return (distanceToNext + 1) / (maxCPDistance + 1);
    }
}
