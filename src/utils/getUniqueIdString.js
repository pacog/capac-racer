import { v4 as uuid } from 'uuid';

/** @type {Object.<string, boolean>} */
const usedIds = {};

/**
 * Gets a unique string id. Will return the intended one if it hasn't been used yet, or will add a unique string to it if it has.
 * @param {string} intendedId
 */
export const getUniqueIdString = (intendedId) => {
    if (!usedIds[intendedId]) {
        usedIds[intendedId] = true;
        return intendedId;
    }
    const uniqueId = `${intendedId}__${uuid()}`;
    usedIds[uniqueId] = true;
    return uniqueId;
};
