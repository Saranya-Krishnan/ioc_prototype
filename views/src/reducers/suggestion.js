import * as SuggestionActionTypes from '../action_types/suggestion';

const initialState = {
    id:'',
    prompt:'',
    isHidden:false,
    isTaken:false,
    meaning: {
        id: '',
        description: '',
        label: '',
        schemaName: '',
        lastUpdate: ''
    }
};

export default function Suggestion(state=initialState, action) {
    switch(action.type) {
        case SuggestionActionTypes.TAKE_SUGGESTION:
            return state;
        case SuggestionActionTypes.UNDO_TAKE_SUGGESTION:
            return state;
        case SuggestionActionTypes.MORE_SUGGESTIONS_LIKE_THIS:
            return state;
        case SuggestionActionTypes.SHOW_SUGGESTION:
            return state;
        case SuggestionActionTypes.HIDE_SUGGESTION:
            return state;
        case SuggestionActionTypes.SHOW_QUEST:
            return Object.assign({}, state, {
                meaning: action.meaning
            });
        default:
            return state;
    }
}
