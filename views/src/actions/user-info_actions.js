import * as UserInfoActionTypes from '../action_types/user-info';

export const uploadAvatar = () => {
    return {
        type: UserInfoActionTypes.UPLOAD_AVATAR
    };
};

export const editBio = () => {
    return {
        type: UserInfoActionTypes.EDIT_BIO
    };
};