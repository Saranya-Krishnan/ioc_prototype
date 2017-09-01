import * as WelcomeDialogActionTypes from '../action_types/welcome-dialog';

export const doTyping = (isTyping) => {
    return {
        type: WelcomeDialogActionTypes.DO_TYPING,
        isTyping
    };
};

export const postMessage = (msg) => {
    return {
        type: WelcomeDialogActionTypes.POST_MESSAGE,
        msg
    };
};

export const getAIResponse = (aiResponse) => {
    return {
        type: WelcomeDialogActionTypes.GET_AI_RESPONSE,
        aiResponse
    };
};