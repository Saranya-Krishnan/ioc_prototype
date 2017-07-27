import React from 'react'
import { Statistic, Menu, Divider } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';

const items = [
    { label: 'Uploads', value: '21' },
    { label: 'Quests Completed', value: '4' },
    { label: 'Quests Accepted', value: '12' },
];

const HomeControls = () => (
    <div>
        <Menu vertical className="home-controls-menu">
            <Menu.Item name='browse'>
                <FontAwesome name='grid' />
                Quests
            </Menu.Item>
            <Menu.Item name='browse'>
                <FontAwesome name='grid' />
                Notebooks
            </Menu.Item>
            <Menu.Item name='browse'>
                <FontAwesome name='grid' />
                Account
            </Menu.Item>
        </Menu>
        <Divider/>
        <h3>My Progress</h3>
        <Statistic.Group horizontal items={items} />
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default HomeControls