import * as ArtWorkInNotebookActionTypes from '../action_types/artwork-in-notebook';


export const loadMyArtwork = (having,artwork) => {
    return {
        type: ArtWorkInNotebookActionTypes.LOAD_MY_ARTWORK,
        having,
        artwork
    };
};