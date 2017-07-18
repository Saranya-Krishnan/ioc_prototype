import * as SuggestionActionTypes from '../action_types/suggestion';

export const takeSuggestion = () => {
    return {
        type: SuggestionActionTypes.TAKE_SUGGESTION
    };
};

export const undoTakeSuggestion = () => {
    return {
        type: SuggestionActionTypes.UNDO_TAKE_SUGGESTION
    };
};

export const moreSuggestionsLikeThis = () => {
    return {
        type: SuggestionActionTypes.MORE_SUGGESTIONS_LIKE_THIS
    };
};

export const showSuggestion = () => {
    return {
        type: SuggestionActionTypes.SHOW_SUGGESTION
    };
};

export const hideSuggestion = () => {
    return {
        type: SuggestionActionTypes.HIDE_SUGGESTION
    };
};

export const showQuest = meaning => {
    return {
        type: SuggestionActionTypes.SHOW_QUEST,
        meaning
    };
};