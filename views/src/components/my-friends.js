import React from 'react'
import { Item, Header } from 'semantic-ui-react';

const MyFriends = () => (
    <div>
        <Header content="Collaborators"/>
        <Item.Group divided>
            <Item>
                <Item.Image size='tiny' src='https://api.adorable.io/avatars/100/wanda%40moleksine' />
                <Item.Content content='Wanda' verticalAlign='middle' />
            </Item>

            <Item>
                <Item.Image size='tiny' src='https://api.adorable.io/avatars/100/luca%40moleksine' />
                <Item.Content content='Luca' verticalAlign='middle' />
            </Item>

            <Item>
                <Item.Image size='tiny' src='https://api.adorable.io/avatars/100/ayush%40moleksine' />
                <Item.Content content='Ayush' verticalAlign='middle' />
            </Item>
        </Item.Group>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default MyFriends