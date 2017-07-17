import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import UserCard from './user-card';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render(){
        return(
            <UserCard
            avatar={''}
            firstName={''}
            lastName={''}
            joinDate={''}
            bio={''}/>
        )
    }
}

UserInfo.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const mapStateToProps = (state) => {
    return {
        state: state['UserInfo'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


