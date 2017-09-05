import * as UploadSharedActionTypes from '../action_types/upload-shared';

const initialState = {
    sharedNotebooks: [
        {
            id:''
        }
    ],
    noNotebooks:true,
    uploadUIVisible: false
};

export default function UploadShared(state=initialState, action) {
    switch(action.type) {
        case UploadSharedActionTypes.ACCOUNT_FOR_NO_NOTEBOOKS:
            return Object.assign({}, state, {
                noNotebooks: action.none
            });
        default:
            return state;
    }
}
