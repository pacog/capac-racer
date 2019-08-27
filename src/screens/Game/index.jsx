import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as gameStates from 'constants/game-states';
import GameBoard from 'components/GameBoard';
import PlayerList from 'components/PlayerList';
import { getGameState, getCurrentPlayer } from 'store/game/selectors';
import { setGameState } from 'store/game/actions';
import { startWaitingForPlayerInput } from 'store/game/async-actions';
import './style.css';

const Game = () => {
    const dispatch = useDispatch();
    const gameState = useSelector((state) => getGameState(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    const isStartScreenOn = gameState === gameStates.START_SCREEN;
    const showPlayerStartTurnModal =
        gameState === gameStates.PLAYER_TURN_START_SCREEN;

    return (
        <div className="App">
            <GameBoard />
            <PlayerList />
            {isStartScreenOn && (
                <div className="start-modal">
                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                setGameState(
                                    gameStates.PLAYER_TURN_START_SCREEN,
                                ),
                            )
                        }
                    >
                        Start game!
                    </button>
                </div>
            )}
            {showPlayerStartTurnModal && (
                <div className="start-modal">
                    <div>{currentPlayer.name}, it is your turn</div>
                    <button
                        type="button"
                        onClick={() => dispatch(startWaitingForPlayerInput())}
                    >
                        Start my turn
                    </button>
                </div>
            )}
        </div>
    );
};

export default Game;
