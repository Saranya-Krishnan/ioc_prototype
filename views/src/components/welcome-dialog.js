import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';
import * as WelcomeDialogActions from '../actions/welcome-dialog_actions';
import { Segment, Container, Form, TextArea, Divider} from 'semantic-ui-react';
import uuid from 'uuid';


class WelcomeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleChatInput = this.handleChatInput.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.sendChat = this.sendChat.bind(this);
        this.addToMessages = this.addToMessages.bind(this);
    }
    handleTyping = (isTyping) => {
        if(this.state.isTyping === true && isTyping === false){
            this.chatDelay = setInterval(()=>this.setState({isTyping:false}), 1000);
        }else{
            clearInterval( this.chatDelay);
            this.setState({isTyping:isTyping});
        }
    };
    sendChat = (msg) => {
        const data = {
            input: {
                text: msg
            },
            alternate_intents: true,
            context: {
                conversation_id: this.state.conversationId
            }
        };
        ajax.post( PathHelper.apiPath + '/dialog')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const m = new Message({id:1, message:response.body.output.text[0]});
                    this.props.getAIResponse(m);
                } else {
                    toastr.error('Error sending your message', error);
                }
            });
    };

    addToMessages = (speaker,message) => {
        let m = new Message({id:speaker,message:message});
        this.state.messages.push(m);
    };

    componentWillReceiveProps( nextProps ) {
        this.setState(nextProps.state);
        const e = document.getElementById("chatContainer");
        e.scrollTop = e.scrollHeight;
    }

    componentDidMount (){
        this.setState({conversationId: uuid.v4()});
        this.sendChat('start');
    }

    componentWillUnmount() {
        clearInterval( this.chatDelay);
    }

    handleChatInput = (event) => {
        if(event.key !== 'Enter'){
            let s = this.state.chatInput + event.key;
            this.setState({chatInput: s})
        }else{
            const m = new Message({id:0, message:this.state.chatInput});
            this.props.postMessage(m);
            this.sendChat(this.state.chatInput);
            this.setState({chatInput: '', isTyping: false})
        }
    };
    render() {
        return (
            <Container className="welcome-dialog-outer">
                <Segment className="welcome-dialog-inner">
                    <Container className="welcome-dialog-chat" id="chatContainer">
                        <ChatFeed
                            messages={this.state.messages ? this.state.messages : [new Message({id:0,message:''})]}
                            isTyping={this.state.isTyping}
                            hasInputField={this.state.hasInputField}
                            bubblesCentered={this.state.bubblesCentered}
                        />
                    </Container>
                    <Divider/>
                    <Form>
                        <TextArea
                            rows={1}
                            value={this.state.chatInput}
                            onKeyPress={this.handleChatInput}
                            onKeyDown={()=> this.handleTyping(true)}
                            onKeyUp={()=> this.handleTyping(false)}
                        />
                    </Form>
                </Segment>
            </Container>
        )
    }
}

WelcomeDialog.propTypes = {
    chatInput: PropTypes.string,
    isTyping: PropTypes.bool,
    messageCount: PropTypes.number,
    messages: PropTypes.arrayOf(Message),
    conversationId: PropTypes.string,
    postMessage: PropTypes.func.isRequired,
    getAIResponse: PropTypes.func.isRequired,
    doTyping: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        doTyping: (isTyping) => {
            dispatch(WelcomeDialogActions.doTyping(isTyping))
        },
        postMessage: (msg) => {
            dispatch(WelcomeDialogActions.postMessage(msg))
        },
        getAIResponse: (aiResponse) => {
            dispatch(WelcomeDialogActions.getAIResponse(aiResponse))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['WelcomeDialog'],
        user: state['Nav']
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDialog);