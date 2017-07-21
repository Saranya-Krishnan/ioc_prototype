import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment} from 'semantic-ui-react';
import * as MyNotebooksActions from '../actions/my-notebooks_actions';
import PathHelper from '../helpers/path-helper';


class MyNotebooks extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.getNotebooks = this.getNotebooks.bind(this);
    }
    getNotebooks(){
        if(!this.state.stopper){
            const data = {
                userId: this.userId
            };
            ajax.post( PathHelper.apiPath + '/notebooks/mine')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        const res = response.body;
                        const notebookIds = [];
                        for(let v in res){
                            if (res.hasOwnProperty(v)) {
                                if(v === 'id'){
                                    notebookIds.push({id:res[v]});
                                }
                            }
                        }
                        this.props.getMyNotebooks(true,notebookIds);
                    } else {
                        console.log('error retrieving your quests', error);
                    }
                });
        }
    }
    setUser(data) {
        this.userId = data.id;
        this.getNotebooks();
        this.setState({stopper: true});
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            this.setUser(nextProps.user.userInfo);
        }
    }
    render() {
        return (
            <Segment>
            </Segment>
        )
    }
}

MyNotebooks.propTypes = {
    myNoteBooks: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
    })),
    currentNotebook:PropTypes.string,
    hasNoNotebooks: PropTypes.string,
    stopper:PropTypes.bool,
    doRedirect: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyNotebooks: (userId) => {
            dispatch(MyNotebooksActions.getMyNotebooks(userId))
        },
        getPagesFromCurrentNotebook: (userId, notebookId) => {
            dispatch(MyNotebooksActions.getPagesFromCurrentNotebook(userId, notebookId))
        },
        setCurrentNotebook: (userId, notebookId) => {
            dispatch(MyNotebooksActions.setCurrentNotebook(userId, notebookId))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['MyNotebooks'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNotebooks);