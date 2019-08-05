import { combineReducers } from 'redux';
import players from './players/reducer';
import map from './map/reducer';

export default combineReducers({
    players,
    map,
});
