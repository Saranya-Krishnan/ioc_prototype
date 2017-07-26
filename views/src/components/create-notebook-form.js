import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ajax from 'superagent';
import * as CreateNotebookFormActions from '../actions/create-notebook-form_actions'
import PathHelper from '../helpers/path-helper';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router';

class CreateNotebookForm extends Component {
    constructor(props){
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.stopper = false;
    }
    setUser(data){
        this.props.updateUserId(data.id);
        this.stopper = true;
    }
    handleDatePicker(date){
        this.setState({when: date});
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentWillMount(){
        this.setState({when: moment()});
    }
    componentDidMount(){
        this.props.parentPage['doRedirect'] = false;
    }
    handleSubmit(e){
        e.preventDefault();
        ajax.post(PathHelper.apiPath + '/notebooks/create')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(this.state))
            .end((error, response) => {
                    if (!error && response) {
                        const nId = response.body.id;
                        this.setState({ noteBookId: nId,  doRedirect: true});
                    } else {
                        console.log('Error submitting your notebook', error);
                    }
                }
            );
    };
    handleTyping(e){
        e.preventDefault();
        if(!this.stopper){
            this.setUser(this.props.user['userInfo']);
        }
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Name 1 </label>
                        <input placeholder='' name='name1' value={this.props.name1}
                               onChange={this.handleTyping}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Name 2 </label>
                        <input placeholder='' name='name2' value={this.props.name2}
                               onChange={this.handleTyping}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Name 3 </label>
                        <input placeholder='' name='name3' value={this.props.name3}
                               onChange={this.handleTyping}/>
                    </Form.Field>
                    <Form.Field>
                        <label>When did receive this notebook?</label>
                        <DatePicker
                            selected={this.state.when}
                            onChange={this.handleDatePicker}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>How do you plan to use it?</label>
                        <input placeholder='' name='how' value={this.props.how} onChange={this.handleTyping}/>
                    </Form.Field>
                    <Form.Field>
                        <label>What do you wish to accomplish by the time you've filled this notebook?</label>
                        <input placeholder='' name='what' value={this.props.what} onChange={this.handleTyping}/>
                        <input type="hidden" name="userId" value={this.state.userId}/>
                    </Form.Field>
                    <Button type='submit' onClick={() => this.handleSubmit}>Submit</Button>
                </Form>
                {this.state.doRedirect ? <Redirect to={"/notebooks/"+this.state.noteBookId}/> : null}
            </div>
        )
    }
}

CreateNotebookForm.propTypes = {
    name1: PropTypes.string,
    name2: PropTypes.string,
    name3: PropTypes.string,
    how: PropTypes.string,
    when: PropTypes.instanceOf(Date),
    what: PropTypes.string,
    doRedirect:PropTypes.bool.isRequired,
    noteBookId: PropTypes.string,
    userId: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
    return {
        doCreation: (data) => {
            dispatch(CreateNotebookFormActions.doCreation(data))
        },
        nextStep: (step) => {
            dispatch(CreateNotebookFormActions.nextStep(step))
        },
        updateUserId: (id) => {
            dispatch(CreateNotebookFormActions.updateUserId(id))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['CreateNotebookForm'],
        parentPage: state['Notebook'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotebookForm);