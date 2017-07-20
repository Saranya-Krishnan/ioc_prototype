import * as ArtworkCardActionTypes from '../action_types/artwork-card';

const initialState = {
    id: '',
    image: '',
    doRedirect:false
};

export default function Quest(state=initialState, action) {
    switch(action.type) {
        case ArtworkCardActionTypes.GO_TO_ARTWORK_PAGE:
            return Object.assign({}, state, {
                doRedirect: action.redirect
            });
        default:
            return state;
    }
}