import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import UserCard from './user-card';
import * as UserInfoActions from '../actions/user-info_actions'
import { Button, Segment } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {

    }
    render(){
        return(
            <Segment>
            <UserCard
                firstName={this.props.user['userInfo'].firstName}
                lastName={this.props.user['userInfo'].lastName}
            />
                <Button onClick={this.props.uploadAvatar}>Edit Avatar</Button>
                <Button onClick={this.props.editBio}>Edit Bio</Button>
            </Segment>
        )
    }
}

UserInfo.propTypes = {
    editBio: PropTypes.func,
    uploadAvatar: PropTypes.func,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAvatar: () => {
            dispatch(UserInfoActions.uploadAvatar())
        },
        editBio: () => {
            dispatch(UserInfoActions.editBio())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['UserInfo'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


