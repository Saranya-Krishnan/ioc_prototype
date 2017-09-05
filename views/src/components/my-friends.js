import React from 'react'
import { Item, Header } from 'semantic-ui-react';
const Avatar1 = require('!!url-loader!../../assets/img/profile_user_1.jpg');
const Avatar2 = require('!!url-loader!../../assets/img/profile_user_2.jpg');
const Avatar3 = require('!!url-loader!../../assets/img/profile_user_3.jpg');
const Avatar4 = require('!!url-loader!../../assets/img/profile_user_4.jpg');
import { Link } from 'react-router-dom';

const MyFriends = () => (
    <div>
        <Header content="Recent Collaborators"/>
        <Item.Group divided>
            <Item>
                <Item.Image size='tiny' src={Avatar1} />
                <Item.Content verticalAlign='middle'>
                    <Link to="/user-example">Elliot Fine</Link>
                </Item.Content>
            </Item>
            <Item>
                <Item.Image size='tiny' src={Avatar3}/>
                <Item.Content verticalAlign='middle'>
                    <Link to="/user-example">Wanda Underhill</Link>
                </Item.Content>
            </Item>

            <Item>
                <Item.Image size='tiny' src={Avatar2} />
                <Item.Content verticalAlign='middle'>
                    <Link to="/user-example">Helen Troy</Link>
                </Item.Content>
            </Item>

            <Item>
                <Item.Image size='tiny' src={Avatar4} />
                <Item.Content verticalAlign='middle'>
                    <Link to="/user-example">Ayusha Kalip</Link>
                </Item.Content>
            </Item>
        </Item.Group>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default MyFriends