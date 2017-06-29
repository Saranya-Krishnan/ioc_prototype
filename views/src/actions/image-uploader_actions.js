import * as ImageUploaderActionTypes from '../action_types/image-uploder';

export const uploadImage = image => {
    return {
        type: ImageUploaderActionTypes.UPLOAD_IMAGE,
        image
    };
};

export const createImage = (image,user) => {
    return {
        type: ImageUploaderActionTypes.CREATE_IMAGE,
        image,
        user
    };
};

export const createArtwork = (image,user) => {
    return {
        type: ImageUploaderActionTypes.CREATE_ARTWORK,
        image,
        user
    };
};

export const classifyImage = image => {
    return {
        type: ImageUploaderActionTypes.CLASSIFY_IMAGE,
        image
    };
};

export const createTags = artwork => {
    return {
        type: ImageUploaderActionTypes.CREATE_TAGS,
        artwork
    };
};

export const rejectTag = tag => {
    return {
        type: ImageUploaderActionTypes.REJECT_TAG,
        tag
    };
};

export const exploreBasedOnThisArtwork = artwork => {
    return {
        type: ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK,
        artwork
    };
};