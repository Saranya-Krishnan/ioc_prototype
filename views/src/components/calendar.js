import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment, Container} from 'semantic-ui-react';
import * as CalendarActions from '../actions/calendar_actions'
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render(){
        let myevents = [
            {
                'title': 'All Day Event',
                'allDay': true,
                'start': new Date(2017, 8, 0),
                'end': new Date(2017, 8, 1)
            },
            {
                'title': 'Long Event',
                'start': new Date(2017, 8, 7),
                'end': new Date(2017, 8, 10)
            },

            {
                'title': 'DTS STARTS',
                'start': new Date(2018, 2, 13, 0, 0, 0),
                'end': new Date(2018, 2, 20, 0, 0, 0)
            },

            {
                'title': 'DTS ENDS',
                'start': new Date(2018, 10, 6, 0, 0, 0),
                'end': new Date(2018, 10, 13, 0, 0, 0)
            },

            {
                'title': 'Some Event',
                'start': new Date(2017, 8, 9, 0, 0, 0),
                'end': new Date(2017, 8, 9, 0, 0, 0)
            },
            {
                'title': 'Conference',
                'start': new Date(2017, 8, 11),
                'end': new Date(2017, 8, 13),
                desc: 'Big conference for important people'
            },
            {
                'title': 'Meeting',
                'start': new Date(2017, 8, 12, 10, 30, 0, 0),
                'end': new Date(2017, 8, 12, 12, 30, 0, 0),
                desc: 'Pre-meeting meeting, to prepare for the meeting'
            },
            {
                'title': 'Lunch',
                'start':new Date(2017, 8, 12, 12, 0, 0, 0),
                'end': new Date(2017, 8, 12, 13, 0, 0, 0),
                desc: 'Power lunch'
            },
            {
                'title': 'Meeting',
                'start':new Date(2017, 8, 12,14, 0, 0, 0),
                'end': new Date(2017, 8, 12,15, 0, 0, 0)
            },
            {
                'title': 'Happy Hour',
                'start':new Date(2017, 8, 12, 17, 0, 0, 0),
                'end': new Date(2017, 8, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day'
            },
            {
                'title': 'Dinner',
                'start':new Date(2017, 8, 12, 20, 0, 0, 0),
                'end': new Date(2017, 8, 12, 21, 0, 0, 0)
            },
            {
                'title': 'Birthday Party',
                'start':new Date(2017, 8, 13, 7, 0, 0),
                'end': new Date(2017, 8, 13, 10, 30, 0)
            }
        ];
        return(
            <Segment>
                <BigCalendar
                    events={myevents}
                    startAccessor='startDate'
                    endAccessor='endDate'
                />
            </Segment>
        )
    }
}

Calendar.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCalendar: () => {
            dispatch(CalendarActions.loadACalendar(data))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Calendar'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);