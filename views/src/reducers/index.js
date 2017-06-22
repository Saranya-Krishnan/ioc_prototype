import { combineReducers } from 'redux'
import FooterReducer from './footer';
import NavReducer from './nav';
import SignInReducer from './sign-in';
import SignUpReducer from './sign-up';

export const mainReducer = combineReducers({
    Footer: FooterReducer,
    Nav: NavReducer,
    SignIn: SignInReducer,
    SignUp: SignUpReducer
});
export default mainReducer;