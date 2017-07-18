import * as ArtworkActionTypes from '../action_types/artwork';

const initialState = {
    work: {
        id:'',
        image:{
            colors: '',
            format: '',
            grayscale: false,
            height: 0,
            id:'',
            url: '',
            width: 0
        },
        tags:[],
    },
    suggestions: []
};

export default function Footer(state=initialState, action) {
    switch(action.type) {
        case ArtworkActionTypes.LOAD_ARTWORK:
            return Object.assign({}, state, {
                work: action.data
            });
            return state;
        case ArtworkActionTypes.GET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.data
            });
            return state;
        case ArtworkActionTypes.USER_NAME_CLICKED:
            console.log('user name clicked');
            return state;
        case ArtworkActionTypes.BROWSE_BASED_ON_THIS:
            console.log('browse based on this');
            return state;
        case ArtworkActionTypes.MORE_LIKE_THIS:
            console.log('more like this');
            return state;
        case ArtworkActionTypes.RELATED_TO_ME:
            console.log('related to me');
            return state;
        default:
            return state;
    }
}
