import * as ExternalUserQuestsActionTypes from '../action_types/external-user-quests';

const initialState = {
    doRedirect:false,
    selectedQuestId: '',
    suggestions:[]
};

export default function ExternalUserQuests(state=initialState, action) {
    switch(action.type) {
        case ExternalUserQuestsActionTypes.VIEW_QUEST:
            return Object.assign({}, state, {
                selectedQuestId: action.questId
            });
            return state;
        case ExternalUserQuestsActionTypes.JOIN_QUEST:
            return Object.assign({}, state, {
                selectedQuestId: action.questId
            });
            return state;
        case ExternalUserQuestsActionTypes.GET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.data
            });
            return state;
        default:
            return state;
    }
}
