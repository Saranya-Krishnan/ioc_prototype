require('dotenv').config();

import React from 'react';
import ReactDOM from 'react-dom'
import '../sass/index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer  from './src/reducers/index';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import Ioc from './src/containers/ioc';
import FontAwesome from 'react-fontawesome';

const initialState = window.__INITIAL_STATE__ = {};

ReactDOM.render(
    <Provider store={createStore(mainReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            {process.env.API_VERSION=== undefined ?
                <div className="ui negative message">
                    <div className="header">
                        <FontAwesome name="warning"/>
                        Major Error
                    </div>
                    <p>The application can't find its environment variables.</p>
                </div>
             :<Ioc />}
        </BrowserRouter>
    </Provider>,
    document.getElementById('ioc-app')
);
registerServiceWorker();
