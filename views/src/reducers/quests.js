import * as QuestsActionTypes from '../action_types/quests';

const initialState = {
    myQuests:[{
        id:''
    }],
    haveQuests: false,
    stopper: false
};

export default function Quests(state=initialState, action) {
    switch(action.type) {
        case QuestsActionTypes.LOAD_MY_QUESTS:
            return Object.assign({}, state, {
                haveQuests: action.having,
                myQuests: action.quests
            });
        default:
            return state;
    }
}