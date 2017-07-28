import * as NotebookActionTypes from '../action_types/notebook';

const initialState = {
    isNewNotebook: false,
    doRedirect:false,
    id: '',
    name:'',
    when:'',
    how:'',
    what:'',
    name1:'',
    name2:'',
    name3:'',
    userId:''
};

export default function Notebook(state=initialState, action) {
    switch(action.type) {
        case NotebookActionTypes.CREATE_NEW_NOTEBOOK:
            return Object.assign({}, state, {
                doRedirect: true
            });
        case NotebookActionTypes.LOAD_NOTE_BOOK:
            return Object.assign({}, state, {
                name: action.notebook.name,
                when: action.notebook.when,
                how: action.notebook.how,
                what: action.notebook.what,
                name1: action.notebook.name1,
                name2: action.notebook.name2,
                name3: action.notebook.name3
            });
        default:
            return state;
    }
}
