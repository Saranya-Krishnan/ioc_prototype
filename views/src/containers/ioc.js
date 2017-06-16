import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Nav from '../components/nav';
import SignUp from './sign-up';

export default class Ioc extends Component {
    render() {
        return (
            <Container>
                <Container text>
                    <Nav></Nav>
                </Container>
                <Container>

                    {/*{this.props.content}*/}

                    <SignUp></SignUp>
                </Container>
            </Container>
        );
    }
}