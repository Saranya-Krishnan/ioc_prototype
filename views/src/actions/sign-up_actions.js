import * as SignUpActionTypes from '../action_types/sign-up';

export const onClickSubmit = () => {
    return {
        type: SignUpActionTypes.SIGN_UP_FORM_SUBMITTED
    };
};