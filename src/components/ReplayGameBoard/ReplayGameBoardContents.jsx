import React from 'react';
import Grid from 'components/Grid';
import { useSelector } from 'react-redux';
import { getAllPlayers } from 'store/game/selectors';
import ReplayPlayerTrail from 'components/ReplayPlayerTrail';

const ReplayGameBoardContents = () => {
    const players = useSelector((state) => getAllPlayers(state));
    const mapZoom = useSelector((state) => state.map.zoom);
    const gridSize = useSelector((state) => state.map.gridSize);
    const circuitInfo = useSelector((state) => state.game.circuitInfo);

    return (
        <>
            <div
                className="replay-game-board-circuit-bg"
                style={{
                    backgroundImage: `url(${circuitInfo.bgImg})`,
                    backgroundSize: `${circuitInfo.width}px ${circuitInfo.height}px`,
                }}
            />
            <Grid zoom={mapZoom} cellSize={gridSize} />
            {players.map((player) => (
                <div key={player.id}>
                    {/* <Player
                        player={player}
                        isActive={player === currentPlayer}
                    /> */}
                    <ReplayPlayerTrail player={player} isActive />
                </div>
            ))}
        </>
    );
};

ReplayGameBoardContents.propTypes = {};

ReplayGameBoardContents.defaultProps = {};

export default ReplayGameBoardContents;
