import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';

const square = { width: 270, height: 270 };

const HowItWorksPromo = () => (
    <div>
        <Header content="How it works"/>
        <Grid>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment circular style={square}>
                    <FontAwesome name="cloud-upload" size="4x"/>
                    <Header as='h2'>
                        Upload
                        <Header.Subheader>
                            Take photos or scans of your Moleskine notebooks.
                        </Header.Subheader>
                    </Header>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment circular style={square}>
                    <FontAwesome name="eye" size="4x"/>
                    <Header as='h2'>
                        Analyze
                        <Header.Subheader>
                            Using 'AI name', well analyze your words and images.
                        </Header.Subheader>
                    </Header>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
                <Segment circular style={square}r>
                    <FontAwesome name="rocket" size="4x"/>
                    <Header as='h2'>
                        Improve
                        <Header.Subheader>
                            Based on your Moleskine art, we'll recommend ways to improve your skills and creativity.
                        </Header.Subheader>
                    </Header>
                </Segment>
            </Grid.Column>
            <Grid.Column width={2}>
            </Grid.Column>
        </Grid>
        <strong className="poc-text">This is placeholder.</strong>
    </div>
);

export default HowItWorksPromo




