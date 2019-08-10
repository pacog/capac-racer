import { combineReducers } from 'redux';
import players from './players/reducer';
import map from './map/reducer';
import mainUI from './main-ui/reducer';

export default combineReducers({
    players,
    map,
    mainUI,
});
