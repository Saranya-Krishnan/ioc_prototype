import * as WelcomeDialogActionTypes from '../action_types/welcome-dialog';

const initialState = {
    currentlyTyping: false,
    messages:[],
    hasInputField: false,
    bubblesCentered: false,
    chatInput:'',
    isTyping: false,
    messageCount: 0,
    conversationId: ''
};

export default function WelcomeDialog(state=initialState, action) {
    switch(action.type) {
        case WelcomeDialogActionTypes.DO_TYPING:
            return Object.assign({}, state, {
                currentlyTyping: action.isTyping
            });
        case WelcomeDialogActionTypes.POST_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.msg]
            };
        case WelcomeDialogActionTypes.GET_AI_RESPONSE:
            return {
                ...state,
                messages: [...state.messages, action.aiResponse]
            };
        default:
            return state;
    }
}