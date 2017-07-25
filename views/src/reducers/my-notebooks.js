import * as UserInfoActionTypes from '../action_types/my-notebooks';

const initialState = {
    myNoteBooks: [
        {
            id:''
        }
    ],
    currentNotebook:'',
    noteBooksFound:0
};

export default function YourNoteBook(state=initialState, action) {
    switch(action.type) {
        case UserInfoActionTypes.SHOW_MY_NOTEBOOKS:
            return Object.assign({}, state, {
                noteBooksFound: action.noteBooksFound,
                myNoteBooks: action.notebooks
            });
        default:
            return state;
    }
}
