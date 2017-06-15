import { combineReducers } from 'redux';
import NavItems from './nav';
const rootReducer = combineReducers({
    navItems: NavItems
});

export default rootReducer;