import express from 'express';
import React from 'react';
import {StaticRouter} from 'react-router'
import ReactDOMServer from 'react-dom/server'
import NavReducer from '../views/src/reducers/nav'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Ioc from '../views/src/containers/ioc';
let router = express.Router();

router.get('*', (req, res) => {
    let context = {};
    const store = createStore(NavReducer);
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
            <link href="./img/favicon.ico" rel="Shortcut Icon" />
            <script src="https://use.typekit.net/ipx6imu.js"></script>
            <script>try{Typekit.load({ async: true });}catch(e){}</script>
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


export default router;

