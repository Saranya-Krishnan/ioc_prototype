import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import * as UserInfoActions from '../actions/user-info_actions'
import { Segment, Button, Container, Image, Form, Input, TextArea } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';
import {toastr} from 'react-redux-toastr';


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleSubmit(event){
        event.preventDefault();
        const data = {
            userId: this.userId,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            bio: this.state.bio,
            avatar: 'http://www.placehold.it/200/200'
        };
        ajax.post( PathHelper.apiPath + '/users/update')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log(response.body);

                } else {
                    toastr.error('Error', error);
                }
            });
    }

    componentDidMount() {
        this.setUser(this.props.user['userInfo']);
    }
    setUser(data){
        this.userId = data.id;
        this.setState({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            avatar:data.avatar,
            bio: data.bio
        });
    }
    render(){
        return(
            <Segment className="user-info">
                {this.state.editMode ?
                    <Container>
                        <Form onSubmit={this.handleSubmit}>
                            <Button onClick={()=>this.props.toggleMode()} floated={"right"}>Close</Button>
                            <Form.Field name="username" control={Input} label='User name'  value={this.state.username} onChange={this.handleInputChange}/>
                            <Form.Field name="firstName" control={Input} label='First name'  value={this.state.firstName} onChange={this.handleInputChange}/>
                            <Form.Field name="lastName" control={Input} label='Last name'  value={this.state.lastName} onChange={this.handleInputChange}/>
                            <Form.Field name="bio" control={TextArea} label='Bio' value={this.state.bio} onChange={this.handleInputChange}/>
                            <Button>Submit</Button>
                        </Form>
                    </Container>
                    :
                    <Container>
                        <Button onClick={()=>this.props.toggleMode()} floated={"right"}>Edit</Button>
                        <Image src={this.props.avatar}/>
                        <h1>{this.state.firstName} {this.state.lastName}</h1>
                        <h2>About</h2>
                        <p>{this.state.bio}</p>
                    </Container>
                }
            </Segment>
        )
    }
}

UserInfo.propTypes = {
    edit: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func.isRequired,
    toggleMode: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string,
        avatar: PropTypes.string
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAvatar: () => {
            dispatch(UserInfoActions.uploadAvatar())
        },
        edit: () => {
            dispatch(UserInfoActions.edit())
        },
        toggleMode: () => {
            dispatch(UserInfoActions.toggleMode())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['UserInfo'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


