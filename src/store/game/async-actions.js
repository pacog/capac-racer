import { setPlayers, moveTo } from 'store/players/actions';
import { changeScreen } from 'store/main-ui/actions';
import { initGame, setGameState, nextTurn } from 'store/game/actions';
import { GAME } from 'constants/screens';
import { WAITING_FOR_PLAYER_INPUT } from 'constants/game-states';

export const initGameWithPlayers = (players, playerOrder) => {
    return (dispatch) => {
        dispatch(setPlayers(players));
        dispatch(initGame(playerOrder));
        dispatch(changeScreen(GAME));
        // TODO: will be done by player input later on, so remove from here
        dispatch(setGameState(WAITING_FOR_PLAYER_INPUT));
    };
};

export const handlePlayerMovement = (player, newIntendedPosition) => {
    return (dispatch) => {
        dispatch(moveTo(player.id, newIntendedPosition));
        dispatch(nextTurn());
    };
};
