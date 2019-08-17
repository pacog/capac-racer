import { isEqual } from 'utils/vector2d';
import { setPlayers, moveTo } from 'store/players/actions';
import { changeScreen } from 'store/main-ui/actions';
import { initGame, nextTurn } from 'store/game/actions';
import { getAllPlayers } from 'store/game/selectors';
import { GAME } from 'constants/screens';

export const initGameWithPlayers = (players, playerOrder) => {
    return (dispatch) => {
        dispatch(setPlayers(players));
        dispatch(initGame(playerOrder));
        dispatch(changeScreen(GAME));
    };
};

export const handlePlayerMovement = (player, newIntendedPosition) => {
    return (dispatch, getState) => {
        const allPlayers = getAllPlayers(getState());
        const collidingPlayer = allPlayers
            .filter((otherPlayer) => otherPlayer.id !== player.id)
            .find((otherPlayer) =>
                isEqual(otherPlayer.position, newIntendedPosition),
            );
        if (collidingPlayer) {
            return;
        }
        dispatch(moveTo(player.id, newIntendedPosition));
        dispatch(nextTurn());
    };
};
