import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Home from './home';
import SignUp from './sign-up';
import SignIn from './sign-in';
import Profile from './profile';
import { Route } from 'react-router-dom';

export default class Ioc extends Component {
    render() {
        return (
            <Container>
                <Container>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/sign-in" component={SignIn}/>
                    <Route path="/profile" component={Profile}/>
                </Container>
            </Container>
        );
    }
}