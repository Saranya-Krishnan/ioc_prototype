import * as QuestsActionTypes from '../action_types/quests';

const initialState = {
    myQuestIds:[''],
    haveQuests: false,
    stopper: false
};

export default function Quests(state=initialState, action) {
    switch(action.type) {
        case QuestsActionTypes.LOAD_MY_QUESTS:
            return Object.assign({}, state, {
                haveQuests: action.having,
                myQuestIds: action.quests
            });
        default:
            return state;
    }
}