import React from 'react'
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Nav = props => {
        return (
            <Container text>
                <Menu pointing secondary>
                    <Link to="/" className={props.activeItem === 'home' ? 'active item' : 'item'} onClick={ () => props.clickMenuItem('home')}>home</Link>
                    { !props.isLoggedIn &&
                        <Menu.Menu position='right'>
                            <Link to="/sign-in" className={props.activeItem === 'sign-in' ? 'active item' : 'item'} onClick={ () => props.clickMenuItem('sign-in')}>sign in</Link>
                            <Link to="/sign-up" className={props.activeItem === 'sign-up' ? 'active item' : 'item'} onClick={ () => props.clickMenuItem('sign-up')}>sign up</Link>
                        </Menu.Menu>
                    }
                    { props.isLoggedIn &&
                        <Menu.Menu position='right'>
                            <Link to="/profile" className={props.activeItem === 'profile' ? 'active item' : 'item'} onClick={ () => props.clickMenuItem('profile')}>profile</Link>
                        </Menu.Menu>
                    }
                </Menu>
            </Container>
        )
};

Nav.propTypes = {
    clickMenuItem: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool
};

export default Nav;