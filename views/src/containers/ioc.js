import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Home from './home';
import SignUp from './sign-up';
import { Route } from 'react-router-dom';

export default class Ioc extends Component {
    render() {
        return (
            <Container>
                <Container>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/sign-up" component={SignUp}/>
                </Container>
            </Container>
        );
    }
}