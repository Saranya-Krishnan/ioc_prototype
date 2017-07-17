import React from 'react'
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';

const UserCard = props => {
    return (
        <Card onClick={function(){}}>
            <Image src={''}/>
            <Card.Content>
                <Card.Header>
                    {props.firstName} {props.lastName}
                </Card.Header>
                <Card.Meta>
                </Card.Meta>
            </Card.Content>
        </Card>
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