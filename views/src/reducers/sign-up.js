import * as SignUpActionTypes from '../action_types/sign-up';

const initialState ={};

export default function SignUp(state=initialState, action) {
    switch(action.type) {
        case SignUpActionTypes.SIGN_UP_FORM_SUBMITTED:
            return state;
        default:
            return state;
    }
}
