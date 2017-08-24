import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import ajax from 'superagent';
import { Redirect } from 'react-router-dom'
const token  = require( '../../../helpers/token');
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        //ToDo convert to reducer
        this.state = {
            email: '',
            password:'',
            redirect: false
        };
    }
    handleSubmit(e){
        e.preventDefault();
            ajax.post(PathHelper.apiPath + '/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(this.state))
                .end((error, response) => {
                        if (!error && response) {
                            token.setToken(response.body.token);
                            this.setState({ redirect: true});
                        } else {
                           toastr.error('Error submitting your credentials', error);
                        }
                    }
                );
    };
    handleTyping(e){
        e.preventDefault();
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
                        <label>Email</label>
                        <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleTyping}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' name='password' value={this.state.password} type="password" onChange={this.handleTyping}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
                {this.state.redirect ? <Redirect to="/profile"/> : ''}
            </div>
        )
    }
}

export default SignIn;