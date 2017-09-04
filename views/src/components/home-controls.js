import React from 'react'
import { Statistic, Container } from 'semantic-ui-react'

const items = [
    { label: 'Uploads', value: '21' },
    { label: 'Quests Completed', value: '4' },
    { label: 'Quests Accepted', value: '12' },
];

const HomeControls = () => (
    <Container>
        <h3>My Progress</h3>
        <Statistic.Group horizontal items={items} />
        <strong className="poc-text">This is placeholder.</strong>
    </Container>
);

export default HomeControls