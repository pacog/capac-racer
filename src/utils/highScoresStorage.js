import { v4 } from 'uuid';

const LOCAL_STORAGE_ID = 'high-scores';
const MAX_SCORES_PER_CIRCUIT = 3;

export const getAll = () => {
    try {
        const all = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));
        return all || {};
    } catch (e) {
        return {};
    }
};

export const getByCircuitId = (circuitId) => {
    const all = getAll();
    return all[circuitId] || [];
};

export const shouldScoreByAdded = (score, circuit) => {
    const circuitScores = getByCircuitId(circuit.id);
    if (circuitScores.length < MAX_SCORES_PER_CIRCUIT) {
        return true;
    }
    const lastScore = circuitScores[circuitScores.length - 1];
    if (isBetterScore(score, lastScore)) {
        return true;
    }

    return false;
};

export const addScore = (score, circuit) => {
    if (!shouldScoreByAdded(score, circuit)) {
        return null;
    }
    const circuitScores = getByCircuitId(circuit.id);
    let insertBefore;
    for (let i = 0; i < circuitScores.length; i += 1) {
        if (isBetterScore(score, circuitScores[i])) {
            insertBefore = i;
            break;
        }
    }
    const scoreToAdd = {
        ...score,
        id: v4(),
    };
    let newScores = circuitScores.slice();
    if (typeof insertBefore === 'number') {
        newScores.splice(insertBefore, 0, scoreToAdd);
    } else {
        newScores.push(scoreToAdd);
    }
    newScores = newScores.slice(0, MAX_SCORES_PER_CIRCUIT);
    updateCircuitScores(circuit, newScores);
    return scoreToAdd;
};

function isBetterScore(score, otherScore) {
    if (score.turns > otherScore) {
        return false;
    }
    if (score.turns < otherScore) {
        return true;
    }

    // Same turns, choose the one with better real time:
    return score.realTimeUsed < otherScore.realTimeUsed;
}

function updateCircuitScores(circuit, newScores) {
    const all = getAll();
    const newAll = {
        ...all,
        [circuit.id]: newScores,
    };
    try {
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(newAll, 2));
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('error saving high score', e);
    }
}