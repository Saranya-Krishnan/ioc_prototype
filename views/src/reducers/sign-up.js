import * as SignUpActionTypes from '../action_types/sign-up';

const initialState = {
    nameValid: true,
    emailValid: true,
    passwordsValid: true,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirm: '',
    doAgree: false,
    redirect: false
};

export default function SignUp(state=initialState, action) {
    switch(action.type) {
        case SignUpActionTypes.SIGN_UP_FORM_SUBMITTED:
            return state;
        default:
            return state;
    }
}
