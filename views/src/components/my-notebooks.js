import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Container, Header} from 'semantic-ui-react';
import * as MyNotebooksActions from '../actions/my-notebooks_actions';
import PathHelper from '../helpers/path-helper';
import NotebookTout from './note-book-tout';


class MyNotebooks extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.getNotebooks = this.getNotebooks.bind(this);
        this.setNotebook = this.setNotebook.bind(this);

    }
    getNotebooks(){
        const data = {
            userId: this.userId
        };
        ajax.post( PathHelper.apiPath + '/notebooks/mine')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const res = response.body;
                    if(res.noteBooksFound<=0){
                        this.props.broadcastUp();
                    }
                    this.setState({noteBooksFound: res.noteBooksFound, myNoteBooks:res.notebooks});
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
    }
    setUser(data) {
        this.userId = data.id;
        this.getNotebooks();
        this.setState({stopper: true, doRedirect: false});
        const userData = {
            userId: this.userId
        };
        ajax.post( PathHelper.apiPath + '/users/get-current-notebook')
            .set('Content-Type', 'application/json')
            .send(userData)
            .end((error, response) => {
                if (!error && response) {
                    const res = response.body;
                    this.setState({currentNotebook:res.id});
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
    }

    setNotebook(id){
        this.setState({currentNotebook:id});
        const data = {
            userId: this.userId,
            notebookId: id
        };
        ajax.post( PathHelper.apiPath + '/users/update-current-notebook')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const res = response.body;
                    this.setState({currentNotebook:res.id});
                } else {
                    console.log('error retrieving your quests', error);
                }
            });

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            this.setUser(nextProps.user.userInfo);
        }
    }

    render() {
        let notebookGroup = null;
        if(this.state.noteBooksFound > 0){
            const notebooks = this.state.myNoteBooks;
            notebookGroup = notebooks.map((n, index) => (
                <NotebookTout name={n.name1+'-'+n.name2+'-'+n.name3} isActive={n.id === this.state.currentNotebook} id={n.id} linkToNotebook={() => this.setNotebook(n.id)} key={index}/>
            ));
        }
        return (
            <div>
                <Container>
                    <Header content="My notebooks"/>
                    {notebookGroup}
                </Container>
            </div>
        )
    }
}

MyNotebooks.propTypes = {
    myNoteBooks: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
    })),
    currentNotebook:PropTypes.string,
    noteBooksFound: PropTypes.number,
    broadcastUp: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
    return {
        showMyNotebooks: (notebooks, notebooksFound) => {
            dispatch(MyNotebooksActions.showMyNotebooks(notebooks,notebooksFound))
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