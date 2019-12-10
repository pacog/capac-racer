import { getPossibleDestinations } from 'store/players/selectors';
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

export default class PartialCircuitSolution {
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
    expand(otherPlayers, maxDepthForSolutions) {
        if (this.currentIteration >= maxDepthForSolutions) {
            return [];
        }
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
            this.checkpointsCovered / this.getTurns();

        this.score = 1; // temp until all scores are calculated
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
