import * as MyNotebookActionsTypes from '../action_types/my-notebooks';

const initialState = {
    myNoteBooks: [
        {
            id:''
        }
    ],
    currentNotebook:''};

export default function YourNoteBook(state=initialState, action) {
    switch(action.type) {
        case MyNotebookActionsTypes.DISPLAY_MY_NOTEBOOKS:
            return Object.assign({}, state, {
                myNoteBooks: action.notebooks
            });
        default:
            return state;
    }
}
