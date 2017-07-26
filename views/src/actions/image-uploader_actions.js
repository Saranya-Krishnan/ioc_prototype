import * as ImageUploaderActionTypes from '../action_types/image-uploder';

export const uploadImage = image => {
    return {
        type: ImageUploaderActionTypes.UPLOAD_IMAGE,
        image
    };
};

export const createImage = (image) => {
    return {
        type: ImageUploaderActionTypes.CREATE_IMAGE,
        image
    };
};

export const createArtwork = (imageId,userId) => {
    return {
        type: ImageUploaderActionTypes.CREATE_ARTWORK,
        imageId,
        userId
    };
};

export const classifyImage = (recognition,imageId) => {
    return {
        type: ImageUploaderActionTypes.CLASSIFY_IMAGE,
        recognition,
        imageId
    };
};

export const createTag = word => {
    return {
        type: ImageUploaderActionTypes.CREATE_TAGS,
        word
    };
};

export const exploreBasedOnThisArtwork = artwork => {
    return {
        type: ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK,
        artwork
    };
};

export const classificationToTags = classification => {
    return {
        type: ImageUploaderActionTypes.CLASSIFICATION_TO_TAGS,
        classification
    };
};

export const visualRecognition = url => {
    return {
        type: ImageUploaderActionTypes.VISUAL_RECOGNITION,
        url
    };
};

export const enrichNewTag = tag => {
    return {
        type: ImageUploaderActionTypes.ENRICH_NEW_TAG,
        tag
    };
};

export const getNewTagOntology = tag => {
    return {
        type: ImageUploaderActionTypes.ENRICH_NEW_TAG,
        tag
    };
};

export const makeMeaning = tag => {
    return {
        type: ImageUploaderActionTypes.MAKE_MEANING,
        tag
    };
};

export const makeSuggestions = meaning => {
    return {
        type: ImageUploaderActionTypes.MAKE_SUGGESTIONS,
        meaning
    };
};