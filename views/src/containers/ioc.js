import React, { Component } from 'react';
import ArtPage from './art-page';
import HomePage from './home-page';
import SignUpPage from './sign-up-page';
import SignInPage from './sign-in-page';
import ProfilePage from './profile-page';
import QuestPage from './quest-page';
import UploadPage from './upload-page';
import CreateNewNotebookPage from './create-new-notebook-page';
import BrowsePage from './browse-page';
import NotebookPage from './notebook-page';
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
                <Route exact={true} path="/" component={HomePage}/>
                <Route path="/upload" component={UploadPage}/>
                <Route path="/sign-up" component={SignUpPage}/>
                <Route path="/sign-in" component={SignInPage}/>
                <Route path="/journey" component={BrowsePage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/art/:id" component={ArtPage}/>
                <Route path="/user/artwork/:id" component={ArtPage}/>
                <Route path="/quest/:id" component={QuestPage}/>
                <Route path="/user/quest/:id" component={QuestPage}/>
                <Route path="/notebooks/new" component={CreateNewNotebookPage}/>
                <Route path="/notebooks/:id" component={NotebookPage}/>
            </div>
        );
    }
}