import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const token = require('../../../helpers/token');
import ajax from 'superagent';
import * as NavActions from '../actions/nav_actions';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    componentDidMount(){
        this.getUserInfo();
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    getUserInfo(){
        this.sessionToken = token.getToken();
        //ToDo: Env path
        ajax.get('http://localhost:3030/api/v0/users/me')
            .set({Accept:'application/json', Authorization:'Token '+ this.sessionToken})
            .end((error, response) => {
                    if (!error && response) {
                        this.props.setLoggedIn(true);
                        this.props.updateUserInfo(JSON.parse(response.text));
                    }else{
                        this.props.setLoggedIn(false);
                    }
                }
            );
    }
    render(){
        return (
            <Container text>
                <Menu pointing secondary>
                    <Link to="/" className={this.state.activeItem === 'home' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('home')}>home</Link>
                    { !this.state.isLoggedIn &&
                    <Menu.Menu position='right'>
                        <Link to="#" className={this.state.activeItem === 'sign-in' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('sign-in')}>sign in</Link>
                        <Link to="#" className={this.state.activeItem === 'sign-up' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('sign-up')}>sign up</Link>
                    </Menu.Menu>
                    }
                    { this.state.isLoggedIn &&
                    <Menu.Menu position='right'>
                        <Link to="/profile" className={this.state.activeItem === 'profile' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('profile')}>{this.state.userInfo.firstName}</Link>
                    </Menu.Menu>
                    }
                </Menu>
            </Container>

        )
    }
}
Nav.propTypes = {
    clickMenuItem: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    sessionToken: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoggedIn: (status) => {
            dispatch(NavActions.setLoggedIn(status))
        },
        clickMenuItem: (name) =>{
            dispatch(NavActions.clickMenuItem(name))
        }

    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);