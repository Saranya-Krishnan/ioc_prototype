import * as notebookActionTypes from '../action_types/notebook';

export const createNewNotebook = (userId) => {
    return {
        type: notebookActionTypes.CREATE_NEW_NOTEBOOK,
        userId
    };
};
