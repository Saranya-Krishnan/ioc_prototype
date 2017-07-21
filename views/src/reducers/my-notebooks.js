import * as UserInfoActionTypes from '../action_types/my-notebooks';

const initialState = {
    myNoteBooks: [
        {
            id:''
        }
    ],
    currentNotebook:'',
    hasNoNotebooks: false,
    stopper: false,
    doRedirect: false
};

export default function YourNoteBook(state=initialState, action) {
    switch(action.type) {
        case UserInfoActionTypes.GET_MY_NOTEBOOKS:
            return state;
        case UserInfoActionTypes.GET_PAGES_FROM_CURRENT_NOTEBOOK:
            return state;
        case UserInfoActionTypes.SET_CURRENT_NOTEBOOK:
            return state;
        case UserInfoActionTypes.CREATE_NEW_NOTEBOOK:
            return state;
        default:
            return state;
    }
}
