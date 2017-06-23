import React, { Component } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import ajax from 'superagent';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleValidationNoPassword = this.handleValidation.bind(this,false);
        this.handleValidationWithPassword = this.handleValidation.bind(this,true);
        this.handleClick = this.handleClick.bind(this);
        this.state ={
            nameValid: true,
            emailValid: true,
            passwordsValid: true,
            firstName:'',
            lastName:'',
            email: '',
            password:'',
            password_confirm:'',
            doAgree: false
        };
    }
    handleClick(){
        this.state.doAgree = ! this.state.doAgree;
        this.handleValidation(false);
    };
    handleValidation(chkpasswords) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({nameValid: Boolean(this.state.firstName && this.state.firstName.length !== 0), emailValid: re.test(this.state.email)});
        if(chkpasswords){
            this.setState({passwordsValid: Boolean(this.state.password === this.state.password_confirm)});
        }
    };
    handleSubmit(e){
        e.preventDefault();
        this.handleValidation(true);
        if(this.state.passwordsValid && this.state.emailValid && this.state.nameValid){
            ajax.post('http://localhost:3030/api/v0/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(this.state))
                .end((error, response) => {
                        if (!error && response) {
                            this.setState({ commits: response.body });
                        } else {
                            console.log('Error submitting your credentials', error);
                        }
                    }
                );
        }
    };
    handleTyping(e){
        e.preventDefault();
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        this.handleValidation(false);
    };
    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>* First Name</label>
                    <input placeholder='First Name' name='firstName' value={this.state.firstName} onChange={this.handleTyping} onBlur={this.handleValidationNoPassword}/>
                </Form.Field>
                <Message negative hidden={this.state.passwordsValid}>
                    <p>First Name is Required</p>
                </Message>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' name='lastName' value={this.state.lastName} onChange={this.handleTyping}/>
                </Form.Field>
                <Form.Field>
                    <label>* Email</label>
                    <input placeholder='Email' name='email' value={this.state.email} onChange={this.handleTyping} onBlur={this.handleValidationNoPassword}/>
                </Form.Field>
                <Message negative hidden={this.state.emailValid}>
                    <p>Invaild email format</p>
                </Message>
                <Form.Field>
                    <label>* Password</label>
                    <input placeholder='Password' name='password' value={this.state.password} type="password" onChange={this.handleTyping} onBlur={this.handleValidationWithPassword}/>
                </Form.Field>
                <Form.Field>
                    <label>* Confirm Password</label>
                    <input placeholder='Confirm Password' name='password_confirm' value={this.state.password_confirm} type="password" onChange={this.handleTyping} onBlur={this.handleValidationWithPassword}/>
                </Form.Field>
                <Message negative hidden={this.state.passwordsValid}>
                    <p>Passwords do not match.</p>
                </Message>
                <Form.Field>
                    <Checkbox label='* I agree to the Terms and Conditions' onClick={this.handleClick} onChange={this.handleTyping} checked={this.state.doAgree} ref="doAgree" name="doAgree"/>
                </Form.Field>
                <Button type='submit' disabled={!this.state.doAgree}>Submit</Button>
            </Form>
        )
    }
}


export default SignUp;
//ToDo: Redux Dispatch
//ToDo: Display Error
//ToDo: Redirect on Success