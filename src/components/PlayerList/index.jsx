import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentPlayer, getAllPlayers } from 'store/game/selectors';
import PlayerListItem from './PlayerListItem';
import './style.css';

const PlayerList = () => {
    const players = useSelector((state) => getAllPlayers(state));
    const currentPlayer = useSelector((state) => getCurrentPlayer(state));

    return (
        <ul className="player-list">
            {players.map((player) => (
                <PlayerListItem
                    key={player.id}
                    player={player}
                    isActive={player === currentPlayer}
                />
            ))}
        </ul>
    );
};

export default PlayerList;
