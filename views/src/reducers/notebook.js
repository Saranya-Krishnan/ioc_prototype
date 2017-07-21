import * as notebookActionTypes from '../action_types/notebook';

const initialState = {
    isNewNotebook: false
};

export default function Notebook(state=initialState, action) {
    switch(action.type) {
        case notebookActionTypes.CREATE_NEW_NOTEBOOK:
            return state;
        default:
            return state;
    }
}
