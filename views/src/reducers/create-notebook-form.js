import * as CreateNotebookFormTypes from '../action_types/create-notebook-form';

const initialState = {
    name1: '',
    name2: '',
    name3: '',
    how: '',
    when: '',
    what: '',
    doRedirect: false,
    noteBookId: '',
    userId:''
};

export default function Notebook(state=initialState, action) {
    switch(action.type) {
        case CreateNotebookFormTypes.DO_CREATION:
            return state;
        case CreateNotebookFormTypes.NEXT_STEP:
            return Object.assign({}, state, {
                step: action.step
            });
        case CreateNotebookFormTypes.UPDATE_USER_ID:
            return Object.assign({}, state, {
                userId: action.id
            });
        default:
            return state;
    }
}
