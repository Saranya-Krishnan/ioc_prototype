import * as MyNotebooksActionTypes from '../action_types/my-notebooks';

export const showMyNotebooks = (notebooks, notebooksFound) => {
    return {
        type: MyNotebooksActionTypes.SHOW_MY_NOTEBOOKS,
        notebooks,
        notebooksFound
    };
};
