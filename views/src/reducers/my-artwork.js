import * as MyArtworkActionTypes from '../action_types/my-artwork';

const initialState = {
    myArtwork:[{
        id:'',
        title:'',
        description:''
    }],
    haveArtwork: false,
    stopper: false
};

export default function MyArtwork (state=initialState, action) {
    switch(action.type) {
        case MyArtworkActionTypes.LOAD_MY_ARTWORK:
            return Object.assign({}, state, {
                haveArtwork: action.having,
                myArtwork: action.artwork
            });
        default:
            return state;
    }
}