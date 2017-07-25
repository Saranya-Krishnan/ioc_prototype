import express from 'express';
import React from 'react';
import {StaticRouter} from 'react-router'
import ReactDOMServer from 'react-dom/server'
import mainReducer  from '../views/src/reducers/index';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Ioc from '../views/src/containers/ioc';
let router = express.Router();


router.get('*', (req, res) => {
    let context = {};
    const store = createStore(mainReducer);
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <Provider store={store}>
                <Ioc/>
            </Provider>
        </StaticRouter>
    );
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end()
    } else {
        const finalState = store.getState();
        res.status(200).send(renderFullPage(html, finalState));
    }
});

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>IoC Prototype</title>
            <link rel="shortcut icon" href="favicon.ico">
            <script src="https://use.typekit.net/ipx6imu.js"></script>
            <script>try{Typekit.load({ async: true });}catch(e){}</script>
            <base href="/" />
        </head>
        <body>
        <div id="ioc-app"><div>${html}</div></div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type=text/javascript src="../bin/app.bundle.js"></script>
        </body>
        </html>`
}
//ToDo: Webpack or API to serve favicon.

export default router;

