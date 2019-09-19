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
    maxTries = 10000,
) => {
    for (let i = 0; i < maxTries; i += 1) {
        const newPick = pickerFn();
        if (arrayToAvoid.indexOf(newPick) === -1) {
            return newPick;
        }
    }
    throw new Error(
        `keepPickingUntilNotInArray: tried ${maxTries} times, no luck`,
    );
};
