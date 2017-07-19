import * as QuestActionTypes from '../action_types/quest';


export const setGoalDate = data => {
    return {
        type: QuestActionTypes.SET_GOAL_DATE,
        data
    };
};

export const addNote = () => {
    return {
        type: QuestActionTypes.ADD_NOTE
    };
};

export const joinQuest = () => {
    return {
        type: QuestActionTypes.JOIN_QUEST
    };
};

export const adabdonQuest = () => {
    return {
        type: QuestActionTypes.ABANDON_QUEST
    };
};

export const seeAllMyQuests = () => {
    return {
        type: QuestActionTypes.SEE_ALL_MY_QUESTS
    };
};

export const goToQuestPage = () => {
    return {
        type: QuestActionTypes.GO_TO_QUEST_PAGE
    };
};