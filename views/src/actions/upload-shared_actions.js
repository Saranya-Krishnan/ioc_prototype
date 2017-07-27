import * as UploadSharedActionTypes from '../action_types/upload-shared';

export const accountForNoNotebooks = (none) => {
    return {
        type: UploadSharedActionTypes.ACCOUNT_FOR_NO_NOTEBOOKS,
        none
    };
};