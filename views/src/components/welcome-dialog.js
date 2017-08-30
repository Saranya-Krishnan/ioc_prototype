import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment, Container, Form, TextArea, Divider} from 'semantic-ui-react';



class WelcomeDialog extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleChatInput = this.handleChatInput.bind(this);
        this.handleEnter = this.handleEnter.bind(this);

    }
    handleEnter = (event) => {
        console.log(event);

    };

    componentWillReceiveProps( nextProps ) {
        this.setState(nextProps.state);
    }

    handleChatInput = (event) => {
        this.setState(
            {
                chatInput: event.target.value
            }
        );
    };
    render() {
        const { dispatch } = this.props;
        let msg =  [
            (
                new Message({
                    id: 1,
                    message: "I'm the recipient! (The person you're talking to)"
            })
            ),
            (
                new Message({
                    id: 0, message: "I'm you -- the blue bubble!"
            })
            )
        ];
        return (
            <Container>
                <Segment>
                    <ChatFeed
                        messages={msg} // Boolean: list of message objects
                        isTyping={true} // Boolean: is the recipient typing
                        hasInputField={false} // Boolean: use our input, or use your own
                        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                    />
                    <Divider/>
                    <Form>
                        <TextArea rows={1} onChange={this.handleChatInput} value={this.state.chatInput} onKeyPress={this.handleEnter}/>
                    </Form>
                </Segment>
            </Container>
        )

    }
}



WelcomeDialog.propTypes = {
    chatInput: PropTypes.string
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const mapStateToProps = (state) => {
    return {
        state: state['WelcomeDialog'],
        user: state['Nav']
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDialog);