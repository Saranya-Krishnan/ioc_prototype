import React from 'react'
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';

const UserCard = props => {
    return (
    <div>
        <h1>{props.firstName} {props.lastName}</h1>
    </div>
    )
};

UserCard.propTypes ={
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    goToProfile: PropTypes.func
};

export default UserCard