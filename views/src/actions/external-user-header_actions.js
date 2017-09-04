import * as ExternalUserHeaderActionTypes from '../action_types/external-user-header';

export const follow = userId => {
    return {
        type: ExternalUserHeaderActionTypes.FOLLOW,
        userId
    };
};

export const unfollow = userId => {
    return {
        type: ExternalUserHeaderActionTypes.UNFOLLOW,
        userId
    };
};
