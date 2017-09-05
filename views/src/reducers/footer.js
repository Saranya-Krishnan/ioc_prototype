import * as FooterActionTypes from '../action_types/footer';

const initialState ={

};

export default function Footer(state=initialState, action) {
    switch(action.type) {
        case FooterActionTypes.FOOTER_ITEM_CLICKED:
            return state;
        default:
            return state;
    }
}
