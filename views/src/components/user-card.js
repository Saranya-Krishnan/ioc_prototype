import React from 'react'
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';

const UserCard = () => {
    return (
        <Card>
            <Image src={this.props.avatar}/>
            <Card.Content>
                <Card.Header>
                    {this.props.firstName} {this.props.lastName}
                </Card.Header>
                <Card.Meta>
            <span className='date'>
              Joined in {this.props.joinDate}
            </span>
                </Card.Meta>
                <Card.Description>
                    {this.props.bio}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <FontAwesome name='user'/>
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    )
};

UserCard.propTypes ={
    avatar: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    joinDate: PropTypes.string,
    bio: PropTypes.bio
};

export default UserCard