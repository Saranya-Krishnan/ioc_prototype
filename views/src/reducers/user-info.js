import * as UserInfoActionTypes from '../action_types/user-info';

const initialState = {

};

export default function UserInfo(state=initialState, action) {
    switch(action.type) {
        case UserInfoActionTypes.UPLOAD_AVATAR:
            return state;
        case UserInfoActionTypes.EDIT_BIO:
            return state;
        default:
            return state;
    }
}
