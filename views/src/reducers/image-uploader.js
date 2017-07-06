import * as ImageUploaderActionTypes from '../action_types/image-uploder';


const initialState = {
    uploadedFileCloudinaryUrl: null,
    uploadedFile: null
};

export default function ImageUploader(state=initialState, action) {
    switch(action.type) {
        case ImageUploaderActionTypes.UPLOAD_IMAGE:
            return Object.assign({}, state, {
                uploadedFileCloudinaryUrl: action.image
            });
        case ImageUploaderActionTypes.CREATE_IMAGE:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.CREATE_ARTWORK:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.CLASSIFY_IMAGE:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.CREATE_TAGS:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.CLASSIFICATION_TO_TAGS:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.VISUAL_RECOGNITION:
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.REJECT_TAG :
            return Object.assign({}, state, {
                ...state
            });
        case ImageUploaderActionTypes.EXPLORE_BASED_ON_THIS_ARTWORK :
            return Object.assign({}, state, {
                ...state
            });
        default:
            return state;
    }
}