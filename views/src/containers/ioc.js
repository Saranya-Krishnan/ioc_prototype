import React, { Component } from 'react';
import Art from './art';
import Home from './home';
import SignUpPage from './sign-up';
import SignInPage from './sign-in';
import Profile from './profile';
import { Route } from 'react-router-dom';
import PathHelper from '../helpers/path-helper';
import ajax from 'superagent';
const IoCSeed = require('./../../../ioc.seed');

export default class Ioc extends Component {
    componentDidMount(){
        let s = [];
        for(let i in IoCSeed.suggestionData){
            if (IoCSeed.suggestionData.hasOwnProperty(i)) {
                s.push({schemaName:i.toString()});
            }
        }
        const data = {
            schemata: s
        };
        ajax.post( PathHelper.apiPath + '/schemata/seed')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('Schema initialized');
                } else {
                    console.log('Initializing schema', error);
                }
            });
    }
    render() {
        return (
            <div>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/sign-in" component={SignInPage}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/art" component={Art}/>
                <Route path="/user/artwork/:id" component={Art}/>
            </div>
        );
    }
}