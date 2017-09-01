import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';

const UserCard = props => {
    return (
        <Card>
            <Image src={props.avatar} />
            <Card.Content>
                <Card.Header>
                    {props.firstName}  {props.lastName}
                </Card.Header>
                <Card.Meta>
                    <span className='date'>
                      Joined in 2015
                    </span>
                </Card.Meta>
                <Card.Description>
                    {props.bio}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    )
};

export default UserCard