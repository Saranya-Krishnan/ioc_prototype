import * as QuestsActionTypes from '../action_types/quests';


export const loadMyQuests = (having,quests) => {
    return {
        type: QuestsActionTypes.LOAD_MY_QUESTS,
        having,
        quests
    };
};