import * as SuggestionsActionTypes from '../action_types/suggestions';

const initialState = {
    headlineText:'',
    helpText:'',
    suggestions: []
};

export default function Suggestions(state=initialState, action) {
    switch(action.type) {
        case SuggestionsActionTypes.GET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.data
            });
            return state;
        default:
            return state;
    }
}
