import React from 'react';
import {render} from 'react-dom';
import './sass/index.scss';
import Ioc from './containers/ioc';
import registerServiceWorker from './registerServiceWorker';

render(
    <Ioc />,
    document.getElementById('ioc-app')
);
registerServiceWorker();
