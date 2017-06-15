import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import '../sass/index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers/index';
import registerServiceWorker from './registerServiceWorker';
import Ioc from './src/containers/ioc';

const initialState = window.__INITIAL_STATE__;

ReactDOM.render(
    <Provider store={createStore(reducers, initialState)}>
        <BrowserRouter>
            <Ioc />
        </BrowserRouter>
    </Provider>,
    document.getElementById('ioc-app')
);
registerServiceWorker();
