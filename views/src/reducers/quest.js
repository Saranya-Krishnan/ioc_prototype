import * as QuestActionTypes from '../action_types/quest';

const initialState = {
    id: '',
    startDate: '',
    goalDate: '',
    completed: false,
    hidden: false,
    statement: '',
    promoMode: true,
    label: '',
    prompt: '',
    description: '',
    hasError: false,
    errorText: ''
};

export default function Quest(state=initialState, action) {
    switch(action.type) {
        case QuestActionTypes.SET_GOAL_DATE:
            return state;
        case QuestActionTypes.ADD_NOTE:
            return state;
        case QuestActionTypes.JOIN_QUEST:
            return state;
        case QuestActionTypes.ABANDON_QUEST:
            return state;
        case QuestActionTypes.SEE_ALL_MY_QUESTS:
            return state;
        case QuestActionTypes.GO_TO_QUEST_PAGE:
            return state;
        default:
            return state;
    }
}