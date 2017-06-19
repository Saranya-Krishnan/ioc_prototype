import * as NavActionTypes from '../action_types/nav';

export default function Nav(state, action) {
    switch(action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            //ToDo: fix ...
            if(state.Nav){
                state.Nav.activeItem = action.name;
            }else{
                state.activeItem = action.name;
                state.Nav = state;
            }
           return state.Nav;
        default:
            return state;
    }
}
