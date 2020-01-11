import { v4 as uuid } from 'uuid';
import { getRandomName } from 'utils/getRandomName';
import { pickRandomFromArray, keepPickingUntilNotInArray } from 'utils/random';
import { STYLES } from 'constants/player-styles';
import { HUMAN } from 'constants/player-types';
import { getPlayersOrderedBy } from 'utils/players-order';
import { setSelectedPlayers, updatePlayer } from './actions';

export const addRandomPlayer = () => {
    return (dispatch, getState) => {
        const state = getState();
        const playerOrder = state.mainUI.selectedPlayerOrder;
        const players = state.mainUI.selectedPlayers;
        const allStyles = Object.values(STYLES);
        const currentNames = players.map((player) => player.name);
        const currentStyles = players.map((player) => player.style);
        const newStyle = keepPickingUntilNotInArray(
            () => pickRandomFromArray(allStyles),
            currentStyles,
        );
        const newName = keepPickingUntilNotInArray(getRandomName, currentNames);

        const newPlayer = {
            id: uuid(),
            name: newName,
            style: newStyle,
            type: HUMAN,
            levelAI: 0,
        };

        dispatch(
            setSelectedPlayers(
                players.concat(newPlayer),
                playerOrder.concat(newPlayer.id),
            ),
        );
    };
};

export const selectNewStyleForPlayer = (player) => {
    return (dispatch, getState) => {
        const state = getState();
        const players = state.mainUI.selectedPlayers;
        const allStyles = Object.values(STYLES);
        const otherPlayers = players.filter(
            (otherPlayer) => otherPlayer.id !== player.id,
        );

        const stylesToUse = allStyles.reduce((acc, style) => {
            if (isStyleUsedByPlayers(style, otherPlayers)) {
                return acc;
            }
            return acc.concat([style]);
        }, []);

        const currentIndex = stylesToUse.findIndex(
            (style) => style.id === player.style.id,
        );

        const nextStyleIndex = (currentIndex + 1) % stylesToUse.length;

        dispatch(
            updatePlayer(player.id, {
                style: stylesToUse[nextStyleIndex],
            }),
        );
    };
};

function isStyleUsedByPlayers(style, players) {
    // eslint-disable-next-line no-restricted-syntax
    for (const player of players) {
        if (player.style.id === style.id) {
            return true;
        }
    }
    return false;
}

export const limitPlayersTo = (numberOfPlayers) => {
    return (dispatch, getState) => {
        const state = getState();
        const players = state.mainUI.selectedPlayers;
        const order = state.mainUI.selectedPlayerOrder;
        const orderedPlayers = getPlayersOrderedBy(players, order);
        dispatch(
            setSelectedPlayers(
                orderedPlayers.slice(0, numberOfPlayers),
                order.slice(0, numberOfPlayers),
            ),
        );
    };
};
