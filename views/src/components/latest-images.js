import React from 'react'
import { Card, Header } from 'semantic-ui-react';
const SamplePanda = require('!!url-loader!../../assets/img/sample_panda.jpg');
const SampleOwl = require('!!url-loader!../../assets/img/sample_owl.jpg');
const SampleWalk = require('!!url-loader!../../assets/img/sample_spread_walk.jpg');
const SampleBird = require('!!url-loader!../../assets/img/sample_spread_bird.jpg');

const LatestImages = () => (
    <div className="latest-images-container">
        <div className="latest-images-inner-container">
        <Header content="Latest Images" className="heading"/>
        <Card.Group itemsPerRow={4}>
            <Card image={SamplePanda} />
            <Card image={SampleOwl} />
            <Card image={SampleWalk} />
            <Card image={SampleBird} />
        </Card.Group>
        <strong className="poc-text">This is placeholder.</strong>
        </div>
    </div>
);

export default LatestImages;