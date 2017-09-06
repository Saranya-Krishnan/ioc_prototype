import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment, Container, Dimmer, Loader} from 'semantic-ui-react';
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
        this.setUser = this.setUser.bind(this);
        this.getMyEvents = this.getMyEvents.bind(this);
        this.convertToEvents = this.convertToEvents.bind(this);

    }
    //ToDo: Create Event Helper.
    convertToEvents(data) {
        let myEvents = [];
        for (let i = 0; i < data.length; i++) {
            let event = {
                title: 'Temporary Title',
                allDay: true,
                start:new Date(data[i].startDate),
                end:  data[i].goalDate ? new Date(data[i].goalDate) : new Date(),
                desc: data[i].statement
            };
            myEvents.push(event);
        }
        this.props.loadACalendar(myEvents);
    }

    getMyEvents(){
        if(!this.state.stopper){
            const data = {
                userId: this.userId
            };
            ajax.post( PathHelper.apiPath + '/events/get-mine')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        this.convertToEvents(response.body);
                    } else {
                        toastr.error('Error retrieving your events', error);
                    }
                });
        }
    }
    setUser(data) {
        this.userId = data.id;
        this.getMyEvents();
        this.setState({stopper: true});
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            this.setUser(nextProps.user.userInfo);
        }
    }
    render(){
        return(
            <Segment>
                {this.state.haveEvents ?
                <BigCalendar
                    events={this.state.myEvents}
                    {...this.props}
                />
                    :
                    <Container className={'calendar-loading'}>
                        <Dimmer active>
                            <Loader />
                        </Dimmer>
                    </Container>
                }
            </Segment>
        )
    }
}

Calendar.propTypes = {
    stopper: PropTypes.bool,
    haveEvents:PropTypes.bool,
    loadACalendar: PropTypes.func.isRequired,
    myEvents2: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            allDay: PropTypes.bool,
            start: PropTypes.instanceOf(Date),
            end: PropTypes.instanceOf(Date),
            desc: PropTypes.string
        }
    )),
    myEvents: PropTypes.arrayOf(PropTypes.any)
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadACalendar: (data) => {
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