import * as ArtworkInNotebookActionTypes from '../action_types/artwork-in-notebook';

const initialState = {
    myArtwork:[{
        id:''
    }],
    haveArtwork: false,
    stopper: false,
    notebookId:''
};

export default function ArtWorkInNoteBook (state=initialState, action) {
    switch(action.type) {
        case ArtworkInNotebookActionTypes.LOAD_MY_ARTWORK:
            return Object.assign({}, state, {
                haveArtwork: action.having,
                myArtwork: action.artwork
            });
        default:
            return state;
    }
}