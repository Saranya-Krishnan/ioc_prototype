import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as notebookActions from '../actions/notebook_actions'
import { Container, Segment, Grid, Card, Header } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';


class Notebook extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    render(){
        return(
            <Container>
                {this.props.isNewNotebook ?
                    <Container>
                        <Header>You don't have an active notebook. Please add one.</Header>
                        <Grid centered columns={4}>
                            <Grid.Column>
                                <Card onClick={() => createNewNotebook}>
                                    <FontAwesome name="plus" size={'4x'} className="add-notebook-icon"/>
                                    <Card.Content>
                                        <Card.Header className="add-notebook-header">
                                            Add Notebook
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Container>
                    :   <Container>
                            display
                        </Container>
                }
            </Container>
        )
    }
}

Notebook.propTypes = {
    isNewNotebook: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewNotebook: () => {
            dispatch(notebookActions.createNewNotebook())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['notebook']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notebook);