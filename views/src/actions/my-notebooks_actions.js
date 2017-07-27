import * as MyNotebooksActionTypes from '../action_types/my-notebooks';

export const displayMyNotebooks = (notebooks) => {
    return {
        type: MyNotebooksActionTypes.DISPLAY_MY_NOTEBOOKS,
        notebooks
    };
};