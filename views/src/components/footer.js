import React from 'react'
import PropTypes from 'prop-types';
import { Segment, Container, Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const logo = require('!!url-loader!../../assets/img/moleskine.png');

const Footer = props => {
    return (
        <div className="footer-wrapper">
        <Segment vertical={true} className={"ioc-footer"} inverted={true}>
            <Container className={"center aligned"}>
                <div className="footer-img-wrapper">
                    <Image src={logo} centered={true} className={'footer-img'}/>
                </div>
                <List link={true} divided={true} inverted={true} horizontal={true} relaxed={true}>
                    <Link to="/" onClick={ () => props.clickFooterItem('home')} className={'footer-link'}>Home</Link>
                    <Link to="/user" onClick={ () => props.clickFooterItem('profile')} className={'footer-link'}>My Profile</Link>
                    <Link to="/features" onClick={ () => props.clickFooterItem('how-it-works')} className={'footer-link'}>How it works</Link>
                    <Link to="/purchase" onClick={ () => props.clickFooterItem('purchase')} className={'footer-link'}>Get the Internet of Creativity</Link>
                </List>
            </Container>
        </Segment>
        </div>
    )
};

Footer.propTypes = {
    clickFooterItem: PropTypes.func.isRequired
};

export default Footer;