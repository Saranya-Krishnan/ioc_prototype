import * as CalendarkActionTypes from '../action_types/calendar';

export const loadACalendar = data => {
    return {
        type: CalendarkActionTypes.LOAD_CALENDAR,
        data
    };
};

