import React from 'react'
import { Item, Header } from 'semantic-ui-react';
const Avatar1 = require('!!url-loader!../../assets/img/profile_user_1.jpg');
const Avatar2 = require('!!url-loader!../../assets/img/profile_user_2.jpg');
const Avatar3 = require('!!url-loader!../../assets/img/profile_user_3.jpg');
const Avatar4 = require('!!url-loader!../../assets/img/profile_user_4.jpg');

const MyFriends = () => (
    <div>
        <Header content="Recent Collaborators"/>
        <Item.Group divided>
            <Item>
                <Item.Image size='tiny' src={Avatar1} />
                <Item.Content content='Eliot Fine' verticalAlign='middle' />
            </Item>

            <Item>
                <Item.Image size='tiny' src={Avatar3}/>
                <Item.Content content='Wanda Underhill' verticalAlign='middle' />
            </Item>

            <Item>
                <Item.Image size='tiny' src={Avatar2} />
                <Item.Content content='Helen Troy' verticalAlign='middle' />
            </Item>

            <Item>
                <Item.Image size='tiny' src={Avatar4} />
                <Item.Content content='Ayusha Kalip' verticalAlign='middle' />
            </Item>
        </Item.Group>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default MyFriends