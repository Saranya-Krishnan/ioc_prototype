import React from 'react'
const SplashImg = require('!!url-loader!../../assets/img/splash.jpg');

const Splash = () => (
    <div>
        <div style={{background: 'url('+SplashImg+')'}} className="splash-main">
            <h1>Moleskine Internet of Creativity</h1>
            <h2>POC, V1</h2>
        </div>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default Splash