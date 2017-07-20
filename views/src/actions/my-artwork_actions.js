import * as MyArtWorkActionTypes from '../action_types/my-artwork';


export const loadMyArtwork = (having,artwork) => {
    return {
        type: MyArtWorkActionTypes.LOAD_MY_ARTWORK,
        having,
        artwork
    };
};