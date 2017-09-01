import * as UserInfoActionTypes from '../action_types/user-info';

const initialState = {
    editMode: false,
    avatarSet: false
};

export default function UserInfo(state=initialState, action) {
    switch(action.type) {
        case UserInfoActionTypes.UPLOAD_AVATAR:
            return state;
        case UserInfoActionTypes.EDIT:
            return Object.assign({}, state, {
                editMode: false
            });
        case UserInfoActionTypes.TOGGLE_MODE:
            return Object.assign({}, state, {
                editMode: !state.editMode
            });
        default:
            return state;
    }
}
