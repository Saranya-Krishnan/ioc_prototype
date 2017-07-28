import * as notebookActionTypes from '../action_types/notebook';

export const createNewNotebook = (userId) => {
    return {
        type: notebookActionTypes.CREATE_NEW_NOTEBOOK,
        userId
    };
};

export const loadNotebook = (notebook) => {
    return {
        type: notebookActionTypes.LOAD_NOTE_BOOK,
        notebook
    };
};
