import {ITEM_CLICKED} from '../actions/nav_actions';

const navItems = [
    {name:'a page'}
];

const INITIAL_STATE  = {all: navItems, currentItem: null};

export default function(state= INITIAL_STATE, action){
    switch(action.type){
        case ITEM_CLICKED:
            return { state, item: action.payload };
        default:
            return state;
    }
}