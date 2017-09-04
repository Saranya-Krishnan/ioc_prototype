import * as ExternalUserArtworksActionTypes from '../action_types/external-user-artworks';

export const viewArtwork = artworkId => {
    return {
        type: ExternalUserArtworksActionTypes.VIEW_ARTWORK,
        artworkId
    };
};


export const loadArtwork = (having,artworks) => {
    return {
        type: ExternalUserArtworksActionTypes.LOAD_ARTWORK,
        having,
        artworks
    };
};