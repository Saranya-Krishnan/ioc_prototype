import * as VideoBGActionTypes from '../action_types/videoBG';

const initialState = {
    videoSRC:''
};

export default function VideoBG(state=initialState, action) {
    switch(action.type) {
        case VideoBGActionTypes.CLICK_VIDEO:
            return state;
        default:
            return state;
    }
}
