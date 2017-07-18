import * as SuggestionsActionTypes from '../action_types/suggestions';

export const hideMeaningGroup = () => {
    return {
        type: SuggestionsActionTypes.HIDE_MEANING_GROUP
    };
};

export const showMeaningGroup = () => {
    return {
        type: SuggestionsActionTypes.SHOW_MEANING_GROUP
    };
};

export const displayMatchingQuest = () => {
    return {
        type: SuggestionsActionTypes.DISMISS_MATCHING_QUEST
    };
};

export const dismissMatchingQuest = () => {
    return {
        type: SuggestionsActionTypes.DISMISS_MATCHING_QUEST
    };
};

export const confirmMatchingQuest = () => {
    return {
        type: SuggestionsActionTypes.CONFIRM_MATCHING_QUEST
    };
};