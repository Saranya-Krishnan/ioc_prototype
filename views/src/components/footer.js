import React from 'react'
import PropTypes from 'prop-types';
import { Segment, Container, Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = props => {
    return (
        <Segment vertical={true} className={"ioc-footer"} inverted={true}>
            <Container className={"center aligned"}>
                <Image centered={true}/>
                <List size={"small"} link={true} divided={true} inverted={true}>
                    <Link to="/profile" onClick={ () => props.clickFooterItem('profile')}>profile</Link>
                </List>
            </Container>
        </Segment>
    )
};

Footer.propTypes = {
    clickFooterItem: PropTypes.func.isRequired
};

export default Footer;