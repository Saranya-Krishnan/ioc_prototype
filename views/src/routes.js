import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ViewItem from './containers/show_list_item';

import Header from './components/header';
import Main from './components/main';

export default (
    <BrowserRouter history={ browserHistory } >
        <Route path="/" component={Header}>
            <IndexRoute component={Main} />
            <Route path="view/:name" component={ViewItem} />
        </Route>
    </BrowserRouter>
)
