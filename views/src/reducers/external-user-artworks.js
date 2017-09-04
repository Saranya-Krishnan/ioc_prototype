import * as ExternalUserArtworksActionTypes from '../action_types/external-user-artworks';

const initialState = {
    doRedirect:false,
    artworks:[{
        id:''
    }],
    haveArtwork: false,
    stopper: false
};


export default function ExternalUserArtworks(state=initialState, action) {
    switch(action.type) {
        case ExternalUserArtworksActionTypes.VIEW_ARTWORK:
            return Object.assign({}, state, {
                doRedirect: true
            });
            return state;
        case ExternalUserArtworksActionTypes.LOAD_ARTWORK:
            return Object.assign({}, state, {
                haveArtwork: action.having,
                artworks: action.artworks
            });
        default:
            return state;
    }
}
