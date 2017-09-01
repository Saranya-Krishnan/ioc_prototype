import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const token = require('../../../helpers/token');
import ajax from 'superagent';
import * as NavActions from '../actions/nav_actions';
import PathHelper from '../helpers/path-helper';
import FontAwesome from 'react-fontawesome';
import {toastr} from 'react-redux-toastr';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getUserInfo = this.getUserInfo.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        token.removeToken();
        this.setState({isLoggedIn: false});
        toastr.warning('Signing Out');
        this.props.signOut();
    }
    componentDidMount(){
        this.getUserInfo();
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    getUserInfo(){
        this.sessionToken = token.getToken();
        ajax.get(PathHelper.apiPath + '/users/me')
            .set({Accept:'application/json', Authorization:'Token '+ this.sessionToken})
            .end((error, response) => {
                    if (!error && response) {
                        if(!response.body.noSignedIn){
                            this.props.setLoggedIn(true);
                            this.props.updateUserInfo(JSON.parse(response.text));
                        }else {
                            this.props.setLoggedIn(false);
                        }
                    }else{
                        this.props.setLoggedIn(false);
                    }
                }
            );
    }
    render(){
        return (
            <Container className="nav-container">
                <Menu pointing secondary fluid>
                    <Link to="/" className={this.state.activeItem === 'home' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('home')}>Home</Link>
                    {!this.state.isLoggedIn ?
                        <Menu.Menu>
                            <Link to="/features" className={this.state.activeItem === 'features' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('features')}>How it works</Link>
                        </Menu.Menu>
                    :   <Menu.Menu>
                            <Link to="/explore" className={this.state.activeItem === 'explore' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('explore')}>Get Inspired</Link>
                            <Link to="/upload" className={this.state.activeItem === 'upload' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('upload')}>Capture Pages</Link>
                            <Link to="/gurus" className={this.state.activeItem === 'gurus' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('gurus')}>Instructors</Link>
                            <Link to="/user/calendar" className={this.state.activeItem === 'calendar' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('calendar')}>Creativity Calendar</Link>
                        </Menu.Menu>
                    }
                    { !this.state.isLoggedIn ?
                    <Menu.Menu position='right'>
                        <Link to="/purchase" className={this.state.activeItem === 'purchase' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('purchase')}>Purchase</Link>
                        <Link to="/sign-in" className={this.state.activeItem === 'sign-in' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('sign-in')}>Sign In</Link>
                        <Link to="/sign-up" className={this.state.activeItem === 'sign-up' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('sign-up')}>Sign Up</Link>
                    </Menu.Menu>
                    : <Menu.Menu position='right'>
                            <Link to="/purchase" className={this.state.activeItem === 'purchase' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('purchase')}>Purchase</Link>
                            <Link to="/" className="item" onClick={ () => this.signOut()}>Sign Out</Link>
                        <Link to="/profile" className={this.state.activeItem === 'profile' ? 'active item' : 'item'} onClick={ () => this.props.clickMenuItem('profile')}><FontAwesome name="user" className="icon profile-icon"/>{this.state.userInfo.firstName}</Link>
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
    signOut: PropTypes.func.isRequired,
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
        },
        signOut: () =>{
            dispatch(NavActions.signOut())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);