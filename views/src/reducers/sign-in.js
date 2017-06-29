import * as SignInActionTypes from '../action_types/sign-in';

const initialState = {
    email: '',
    password: '',
    redirect: false
};


export default function SignIn(state=initialState, action) {
    switch(action.type) {
        case SignInActionTypes.SIGN_IN_FORM_SUBMITTED:
            return state;
        default:
            return state;
    }
}
