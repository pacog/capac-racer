import { v4 as uuid } from 'uuid';
import { getRandomName } from 'utils/getRandomName';
import { pickRandomFromArray, keepPickingUntilNotInArray } from 'utils/random';
import { STYLES } from 'constants/player-styles';
import { setSelectedPlayers } from './actions';

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
        };

        dispatch(
            setSelectedPlayers(
                players.concat(newPlayer),
                playerOrder.concat(newPlayer.id),
            ),
        );
    };
};
