import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ExternalUserHeaderActions from '../actions/external-user-header_actions';
import { Container, Grid, Image, Button } from 'semantic-ui-react';
const Avatar2 = require('!!url-loader!../../assets/img/profile_user_2.jpg');


class ExternalUserHeader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {
        this.setState({doRedirect: false});
    }
    render(){
        return(
            <Container>
                <Grid padded={true}>
                    <Grid.Column width={6}>
                        <Image src={Avatar2} shape="circular" size={"medium"}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <h1>Helen Troy</h1>
                        <p>An eagle is the home of a haircut. Before laughs, tips were only steels. A street is a golf's drug. A bankbook of the marimba is assumed to be an unfair male.</p>
                        <div>
                            {this.state.isFollowing ?
                                <Button floated={'right'} onClick={()=>this.props.follow()}>Unfollow</Button>
                                :
                                <Button floated={'right'} onClick={()=>this.props.follow()}>Follow</Button>
                            }
                        </div>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

ExternalUserHeader.propTypes = {
    isFollowing: PropTypes.bool,
    followId: PropTypes.string,
    unfollowId:PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(ExternalUserHeaderActions.follow(userId))
        },
        unfollow: (userId) => {
            dispatch(ExternalUserHeaderActions.unfollow(userId))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ExternalUserHeader']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalUserHeader);