import * as MyNotebooksActionTypes from '../action_types/my-notebooks';

export const getMyNotebooks = (userId) => {
    return {
        type: MyNotebooksActionTypes.GET_MY_NOTEBOOKS,
        userId
    };
};

export const getPagesFromCurrentNotebook = (userId, notebookId) => {
    return {
        type: MyNotebooksActionTypes.GET_PAGES_FROM_CURRENT_NOTEBOOK,
        userId,
        notebookId
    };
};

export const setCurrentNotebook =  (userId, notebookId) => {
    return {
        type: MyNotebooksActionTypes.SET_CURRENT_NOTEBOOK,
        userId,
        notebookId
    };
};

export const createNewNotebook = (userId) => {
    return {
        type: MyNotebooksActionTypes.CREATE_NEW_NOTEBOOK,
        userId
    };
};
