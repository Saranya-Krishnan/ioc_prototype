import React from 'react'
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react'


const Nav = props => {
        return (
            <Container text>
                <Menu pointing secondary>
                    <Menu.Item name='home' active={props.activeItem === 'home'} onClick={ () => props.clickMenuItem('home')}/>
                    { !props.isLoggedIn &&
                        <Menu.Menu position='right'>
                            <Menu.Item name='sign up' active={props.activeItem === 'sign up'} onClick={ () => props.clickMenuItem('sign up')}/>
                            <Menu.Item name='sign in' active={props.activeItem === 'sign in'} onClick={ () => props.clickMenuItem('sign in')}/>
                        </Menu.Menu>
                    }
                    { props.isLoggedIn &&
                        <Menu.Menu position='right'>
                            <Menu.Item name='profile' active={props.activeItem === 'profile'} onClick={ () => props.clickMenuItem('profile')}/>
                        </Menu.Menu>
                    }
                </Menu>
            </Container>
        )
};

Nav.propTypes = {
    clickMenuItem: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    redirect: PropTypes.bool
};

export default Nav;