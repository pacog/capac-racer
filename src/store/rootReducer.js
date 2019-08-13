import { combineReducers } from 'redux';
import players from './players/reducer';
import map from './map/reducer';
import mainUI from './main-ui/reducer';
import game from './game/reducer';

export default combineReducers({
    players,
    map,
    mainUI,
    game,
});
