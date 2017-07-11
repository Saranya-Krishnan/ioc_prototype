import * as ArtWorkActionTypes from '../action_types/artwork';

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
        }
    }

};

export default function Footer(state=initialState, action) {
    switch(action.type) {
        case ArtWorkActionTypes.USER_NAME_CLICKED:
            console.log('user name clicked');
            return state;
        case ArtWorkActionTypes.BROWSE_BASED_ON_THIS:
            console.log('browse based on this');
            return state;
        case ArtWorkActionTypes.MORE_LIKE_THIS:
            console.log('more like this');
            return state;
        case ArtWorkActionTypes.RELATED_TO_ME:
            console.log('related to me');
            return state;
        default:
            return state;
    }
}
