import React from 'react'
import PropTypes from 'prop-types';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import ajax from 'superagent';

const SignUp = props => {
    handleSubmit = () => {
        ajax.get('http://localhost:3030/api/v0/register')
            .end((error, response) => {
                    if (!error && response) {
                        this.setState({ commits: response.body });
                    } else {
                        console.log('Error submitting your credentials', error);
                    }
                }
            );
    };
    return(
        <Form>
            <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name'/>
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name'/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email'/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password'/>
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input placeholder='Confirm Password'/>
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions'/>
            </Form.Field>
            <Button type='submit' onClick={() => handleSubmit()}>Submit</Button>
        </Form>
    )
};

SignUp.propTypes = {

};

export default SignUp;