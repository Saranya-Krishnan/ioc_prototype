import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


const Instructor = (props) => (
    <Card onClick={props.clickInstructor}>
        <Image src={props.image} />
        <Card.Content>
            <Card.Header>
                {props.name}
            </Card.Header>
            <Card.Meta>
                {props.subjectName}
            </Card.Meta>
            <Card.Description>
                {props.bio}
            </Card.Description>
        </Card.Content>
        <span className="instructor-links">
            <Link to={'/guru/'+props.id} className="instructor-link">View</Link>
                <a className="instructor-link">
                    <Icon name='user' />
                    {props.followers} Followers
                </a>
        </span>
    </Card>
);

export default Instructor