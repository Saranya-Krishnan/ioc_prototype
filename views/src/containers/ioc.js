import React, { Component } from 'react';
import Art from './art';
import Browse from './browse';
import Home from './home';
import SignUpPage from './sign-up';
import SignInPage from './sign-in';
import Profile from './profile';

import { Route } from 'react-router-dom';

export default class Ioc extends Component {
    render() {
        return (
            <div>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/sign-in" component={SignInPage}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/art" component={Art}/>
                <Route path="/browse" component={Browse}/>
            </div>
        );
    }
}