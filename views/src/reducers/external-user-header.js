import * as ExternalUserHeaderActionTypes from '../action_types/external-user-header';

const initialState = {
    isFollowing: false,
    followId: '',
    unfollowId: ''
};


export default function ExternalUserHeader(state=initialState, action) {
    switch(action.type) {
        case ExternalUserHeaderActionTypes.FOLLOW:
            return Object.assign({}, state, {
                followId: action.userId,
                isFollowing: true
            });
            return state;
        case ExternalUserHeaderActionTypes.UNFOLLOW:
            return Object.assign({}, state, {
                unfollowId: action.userId,
                isFollowing: false
            });
            return state;
        default:
            return state;
    }
}
