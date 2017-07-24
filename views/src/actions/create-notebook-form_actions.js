import * as CreateNotebookFormActionTypes from '../action_types/create-notebook-form';

export const nextStep = step => {
    return {
        type: CreateNotebookFormActionTypes.NEXT_STEP,
        step
    };
};

export const doCreation = data => {
    return {
        type: CreateNotebookFormActionTypes.DO_CREATION,
        data
    };
};

export const updateUserId = id => {
    return {
        type: CreateNotebookFormActionTypes.UPDATE_USER_ID,
        id
    };
};
