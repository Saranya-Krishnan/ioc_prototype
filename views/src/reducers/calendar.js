import * as CalendarActionTypes from '../action_types/calendar';

const initialState = {
    stopper: false,
    haveEvents: false,
    myEvents: [
        {

        }
    ]
};

export default function Calendar(state=initialState, action) {
    switch(action.type) {
        case CalendarActionTypes.LOAD_CALENDAR:
            return Object.assign({}, state, {
                haveEvents: true,
                myEvents: action.data
            });
            return state;
        default:
            return state;
    }
}

