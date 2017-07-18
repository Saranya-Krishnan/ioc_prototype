import * as SuggestionsActionTypes from '../action_types/suggestions';

const initialState = {
    questOpen: null,
    meaningGroups: []
};

export default function Suggestions(state=initialState, action) {
    switch(action.type) {
        case SuggestionsActionTypes.HIDE_MEANING_GROUP:
            return state;
        case SuggestionsActionTypes.SHOW_MEANING_GROUP:
            return state;
        case SuggestionsActionTypes.DISPLAY_MATCHING_QUEST:
            return state;
        case SuggestionsActionTypes.DISMISS_MATCHING_QUEST:
            return state;
        case SuggestionsActionTypes.CONFIRM_MATCHING_QUEST:
            return state;
        default:
            return state;
    }
}
