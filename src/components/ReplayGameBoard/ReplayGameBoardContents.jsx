import React from 'react';
import Grid from 'components/Grid';
import { useSelector } from 'react-redux';
import { getRaceHistory } from 'store/game/selectors';
import ReplayPlayerTrail from 'components/ReplayPlayerTrail';

const ReplayGameBoardContents = () => {
    const raceHistory = useSelector((state) => getRaceHistory(state));
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
            {/* <Player
                        player={player}
                        isActive={player === currentPlayer}
                    /> */}
            <ReplayPlayerTrail raceHistory={raceHistory} isActive />
        </>
    );
};

ReplayGameBoardContents.propTypes = {};

ReplayGameBoardContents.defaultProps = {};

export default ReplayGameBoardContents;
