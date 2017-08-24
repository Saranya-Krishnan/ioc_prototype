import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as NotebookActions from '../actions/notebook_actions'
import * as ArtworkInNotebookActionCreators from '../actions/artwork-in-notebook_actions';
import { Container,  Grid, Card, Header, Divider } from 'semantic-ui-react';
import ArtworkInNotebook from './artwork-in-notebook';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router';
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';


class Notebook extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getNotebook = this.getNotebook.bind(this);
    }

    getNotebook(){
        if(this.props.id) {
            const data = {
                notebookId: this.props.id
            };
            ajax.post(PathHelper.apiPath + '/notebooks/display')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        const res = response.body;
                        const notebookData = {
                            when: res.when,
                            how: res.how,
                            what: res.what,
                            name1: res.name1,
                            name2: res.name2,
                            name3: res.name3
                        };
                        this.props.loadNotebook(notebookData);
                    } else {
                       toastr.error('Error', error);
                    }
                });

        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {
        this.setState({doRedirect: false});
        this.getNotebook();
    }
    render(){
        const { dispatch } = this.props;
        const loadMyArtwork = bindActionCreators(ArtworkInNotebookActionCreators.loadMyArtwork, dispatch);
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
                    :   <Container text>
                            <Header content={this.state.name1 +'-'+this.state.name2+'-'+this.state.name3}/>
                            <h3>Received</h3>
                            <p>{moment(this.state.when).format("MMM Do YYYY")}</p>
                            <h3>Intended For</h3>
                            <p>{this.state.how}</p>
                            <h3>Goals</h3>
                            <p>{this.state.what}</p>
                            <Divider/>
                            <ArtworkInNotebook
                             notebookId={this.props.id}
                             loadMyArtwork={loadMyArtwork}/>
                        </Container>
                }
            </Container>
        )
    }
}

Notebook.propTypes = {
    isNewNotebook: PropTypes.bool.isRequired,
    createNewNotebook: PropTypes.func.isRequired,
    loadNotebook: PropTypes.func.isRequired,
    doRedirect:PropTypes.bool.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    isActive: PropTypes.bool,
    when:PropTypes.instanceOf(Date),
    how: PropTypes.string,
    what: PropTypes.string,
    name1: PropTypes.string,
    name2: PropTypes.string,
    name3: PropTypes.string,
    userId: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewNotebook: () => {
            dispatch(NotebookActions.createNewNotebook())
        },
        loadNotebook: (notebook) => {
            dispatch(NotebookActions.loadNotebook(notebook))
        },
        loadMyArtwork: (notebook) => {
            dispatch(ArtworkInNotebookActionCreators.loadMyArtwork(notebook))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Notebook']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notebook);