import React from 'react'
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react'

const SignIn = props => {
    return(
        <Form>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email'/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password'/>
            </Form.Field>
            <Button type='submit' onClick={() => props.onClickSubmit()}>Sign In</Button>
        </Form>
    )
};

SignIn.propTypes = {
    onClickSubmit: PropTypes.func.isRequired
};

export default SignIn;