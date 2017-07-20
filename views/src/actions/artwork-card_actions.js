import * as ArtworkCardActionTypes from '../action_types/artwork-card';


export const goToArtworkPage = redirect => {
    return {
        type: ArtworkCardActionTypes.GO_TO_ARTWORK_PAGE, redirect
    };
};