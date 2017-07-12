require('dotenv').config()
import React from 'react';
import ReactDOM from 'react-dom'
import '../sass/index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer  from './src/reducers/index';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import Ioc from './src/containers/ioc';

const initialState = window.__INITIAL_STATE__ = {};

ReactDOM.render(
    <Provider store={createStore(mainReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Ioc />
        </BrowserRouter>
    </Provider>,
    document.getElementById('ioc-app')
);
registerServiceWorker();