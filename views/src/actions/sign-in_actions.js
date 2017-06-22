import * as SignInActionTypes from '../action_types/sign-in';

export const onClickSubmit = () => {
    return {
        type: SignInActionTypes.SIGN_IN_FORM_SUBMITTED
    };
};