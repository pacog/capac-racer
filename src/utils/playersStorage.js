export const storeSavedPlayers = (playerOrder, players) => {
    if (!window.localStorage) {
        return;
    }
    const playersInfoToStore = {
        version: window.capac_racer_version,
        playerOrder,
        players,
    };
    try {
        window.localStorage.setItem(
            'players',
            JSON.stringify(playersInfoToStore),
        );
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Error trying to save localStorage`, e);
    }
};

export const getSavedPlayers = () => {
    if (!window.localStorage) {
        return null;
    }
    let result;
    try {
        result = window.localStorage.getItem('players');
    } catch (e) {
        return null;
    }

    if (!result) {
        return null;
    }

    // At some point we may need to check if versions are compatible
    return JSON.parse(result);
};
