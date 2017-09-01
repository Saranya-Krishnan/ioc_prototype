import * as SuggestionsActionTypes from '../action_types/suggestions';

export const getSuggestions = data => {
    return {
        type: SuggestionsActionTypes.GET_SUGGESTIONS,
        data
    };
};
