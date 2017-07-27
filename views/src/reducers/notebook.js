import * as NotebookActionTypes from '../action_types/notebook';

const initialState = {
    isNewNotebook: false,
    doRedirect:false
};

export default function Notebook(state=initialState, action) {
    switch(action.type) {
        case NotebookActionTypes.CREATE_NEW_NOTEBOOK:
            return Object.assign({}, state, {
                doRedirect: true
            });
        default:
            return state;
    }
}
