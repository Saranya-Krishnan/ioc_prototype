import * as ExternalUserQuestsActionTypes from '../action_types/external-user-quests';

export const viewQuest = questId => {
    return {
        type: ExternalUserQuestsActionTypes.VIEW_QUEST,
        questId
    };
};

export const joinQuest = questId => {
    return {
        type: ExternalUserQuestsActionTypes.JOIN_QUEST,
        questId
    };
};

export const getSuggestions = data => {
    return {
        type: ExternalUserQuestsActionTypes.GET_SUGGESTIONS,
        data
    };
};
