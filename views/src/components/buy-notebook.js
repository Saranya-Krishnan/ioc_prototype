import React from 'react';
import { Image, Message, Button, Container, Grid, Statistic} from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
const img = require('!!url-loader!../../assets/img/notebook_basic.jpg');

const BuyNotebook = props => {
    const featureList = [
        "A childly craftsman without drives is truly a country of porrect pinks.",
        "This could be, or perhaps the surgeon of a trade",
        "An unbruised baritone. Turnovers are unmissed gardens.",
        "In ancient times a girl of the boundary is assumed to be an unlaid puma."
    ];
    return (
        <Container className={'notebook-offer'}>
            <Grid columns={2}>
                <Grid.Column>
                    <h1>Get the IoC Notebook</h1>
                    <Message header={'Features'} list={featureList}/>
                    <p>We can assume that any instance of a cousin can be construed as an unstringed pea. Authors often misinterpret the state as a briefless sphere, when in actuality it feels more like a gripping aries.</p>
                    <p>A twilight can hardly be considered a nerval keyboard without also being a wrecker. In ancient times an unused food is a creditor of the mind.</p>
                </Grid.Column>
                <Grid.Column>
                    <Container className={'image-wrapper'}>
                        <Image src={img} height={400}/>
                    </Container>
                    <Container className={'bottom-bar'}>
                        <Statistic horizontal value='€45'/>
                        <Button className={'purchase-button'}> <FontAwesome name="cart-plus" size={'2z'} className={'cart-icon'}/> Add to Cart</Button>
                    </Container>
                </Grid.Column>
            </Grid>
            <strong className="poc-text">This is placeholder.</strong>
        </Container>
    )
};

export default BuyNotebook;