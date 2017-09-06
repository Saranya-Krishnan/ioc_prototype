import React from 'react';
import { Container, Grid, Statistic, Button, Image} from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
const img = require('!!url-loader!../../assets/img/credit.png');


const BuyCredits = props => {
    return (
        <Container  className={'credit-offer'}>
            <Grid columns={2}>
                <Grid.Column>
                    <h1>Get Credits</h1>
                    <p>We can assume that any instance of a cousin can be construed as an unstringed pea. Authors often misinterpret the state as a briefless sphere, when in actuality it feels more like a gripping aries.</p>
                    <p>A twilight can hardly be considered a nerval keyboard without also being a wrecker. In ancient times an unused food is a creditor of the mind.</p>
                </Grid.Column>
                <Grid.Column>
                    <Container className={'image-wrapper'}>
                        <Image src={img} height={180}/>
                    </Container>
                    <Container className={'bottom-bar'}>
                        <Statistic horizontal value='€10' label={'/month'}/>
                        <Button className={'purchase-button'}> <FontAwesome name="cart-plus" size={'2z'} className={'cart-icon'}/>Add to Cart</Button>
                    </Container>
                </Grid.Column>
            </Grid>
            <strong className="poc-text">This is placeholder.</strong>
        </Container>
    )
};

export default BuyCredits;