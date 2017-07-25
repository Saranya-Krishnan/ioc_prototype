import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NotebookActions from '../actions/notebook_actions'
import { Container,  Grid, Card, Header } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router';


class Notebook extends Component {
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
                {this.props.isNewNotebook ?
                    <Container>
                        <Header>You don't have an active notebook. Please add one.</Header>
                        <Grid centered columns={4}>
                            <Grid.Column>
                                <Card onClick={ () => this.state.createNewNotebook()}>
                                    {this.state.doRedirect ? <Redirect push to={"/notebooks/new/"}/> : null}
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
    isNewNotebook: PropTypes.bool.isRequired,
    createNewNotebook: PropTypes.func.isRequired,
    doRedirect:PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewNotebook: () => {
            dispatch(NotebookActions.createNewNotebook())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Notebook']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notebook);