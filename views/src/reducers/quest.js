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
    errorText: '',
    doRedirect: false,
    noQuest: false
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
            return Object.assign({}, state, {
                doRedirect: action.redirect
            });
        case QuestActionTypes.DISPLAY_THAT_THERE_ARE_NO_QUESTS:
            return Object.assign({}, state, {
                noQuest: true
            });
        case QuestActionTypes.SHOW_DETAIL:
            return Object.assign({}, state, {
                startDate: action.data.startDate,
                goalDate: action.data.goalDate,
                completed:action.data.completed,
                hidden: action.data.hidden,
                statement: action.data.statement,
                label: action.data.label,
                description: action.data.description,
                prompt: action.data.prompt,
                doRedirect: action.data.doRedirect
            });
        default:
            return state;
    }
}