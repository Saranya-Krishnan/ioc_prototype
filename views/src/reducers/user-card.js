import * as UserCardActionTypes from '../action_types/user-card';

const initialState = {
    avatar: '',
    firstName: '',
    lastName: '',
    bio:''
};

export default function UserCard(state=initialState, action) {
    switch(action.type) {
        case UserCardActionTypes.GO_TO_PROFILE:
            return state;
        default:
            return state;
    }
}
