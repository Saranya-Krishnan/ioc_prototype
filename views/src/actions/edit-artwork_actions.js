import * as EditArtworkActionTypes from '../action_types/edit-artwork';

export const x = y => {
    return {
        type: EditArtworkActionTypes.ITEM_CLICKED,
        y
    };
};
