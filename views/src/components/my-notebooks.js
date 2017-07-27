import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Container, Header} from 'semantic-ui-react';
import PathHelper from '../helpers/path-helper';
import NotebookTout from './note-book-tout';


class MyNotebooks extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.setNotebook = this.setNotebook.bind(this);
        this.stopper = false;
    }
    setUser(data) {
        this.userId = data.id;
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
                    console.log('error retrieving your notebooks', error);
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
            if(!this.stopper){
                this.setUser(nextProps.user.userInfo);
            }
        }
    }

    render() {
        let notebookGroup = null;
        if(this.props.myNoteBooks){
            const notebooks = this.props.myNoteBooks;
            notebookGroup = notebooks.map((n, index) => (
                <NotebookTout name={n.name1+'-'+n.name2+'-'+n.name3} isActive={n.id === this.state.currentNotebook} id={n.id} linkToNotebook={() => this.setNotebook(n.id)} key={index}/>
            ));
        }
        return (
            <Container>
                <Header content="My notebooks"/>
                <p className="add-notebook-instructions">Click to select the notebook your upload comes from.</p>
                <div className="notebook-tout-grid">
                    {notebookGroup}
                </div>
            </Container>
        )
    }
}

MyNotebooks.propTypes = {
    myNoteBooks: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
    })),
    currentNotebook:PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const mapStateToProps = (state) => {
    return {
        state: state['MyNotebooks'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNotebooks);