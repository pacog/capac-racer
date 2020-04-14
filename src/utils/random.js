export const pickRandomFromArray = (array) => {
    if (!array || !array.length) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const keepPickingUntilNotInArray = (
    pickerFn,
    arrayToAvoid,
    compareFunction = (a, b) => a === b,
    maxTries = 10000,
) => {
    for (let i = 0; i < maxTries; i += 1) {
        const newPick = pickerFn();
        const found = arrayToAvoid.find((el) => compareFunction(el, newPick));
        if (!found) {
            return newPick;
        }
    }
    throw new Error(
        `keepPickingUntilNotInArray: tried ${maxTries} times, no luck`,
    );
};

export const getRandomInRange = (min, max) => {
    return min + Math.random() * (max - min);
};
