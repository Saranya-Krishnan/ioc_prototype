import * as CalendarActionTypes from '../action_types/calendar';

const initialState = {};


export default function Calendar(state=initialState, action) {
    switch(action.type) {
        case CalendarActionTypes.LOAD_CALENDAR:
            return Object.assign({}, state, {
                data: action.data
            });
            return state;
        default:
            return state;
    }
}

