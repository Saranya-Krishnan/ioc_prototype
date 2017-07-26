import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment, Container, Image, Button, Card, Divider } from 'semantic-ui-react';
import * as ArtworkActions from '../actions/artwork_actions'
import PathHelper from '../helpers/path-helper';
import Tag from './tag';
import Suggestion from './suggestion';

class Artwork extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.temp = this.temp.bind(this);
        this.loadSuggestions = this.loadSuggestions.bind(this);
        this.updateSuggestions = this.updateSuggestions.bind(this);
    }
    // ToDo: Can Remove Tags #11
    temp(){
        console.log('temp');
    }
    updateSuggestions(suggestions){
        this.props.getSuggestions(suggestions);
    }
    loadSuggestions(tags) {
        let suggestionHolder = [];
        let promptCheck = [];
        for (let t = 0; t < tags.length; t++) {
            let tagData={
              tagId: tags[t].id
            };
            ajax.post(PathHelper.apiPath + '/suggestions/get-suggestions')
                .set('Content-Type', 'application/json')
                .send(tagData)
                .end((error, response) => {
                    if (!error && response) {
                        let r = JSON.parse(response.body);
                        for(let s =0; s<r.length; s++){
                            if(promptCheck.indexOf(r[s].prompt)===-1){
                               promptCheck.push(r[s].prompt);
                               suggestionHolder.push(r[s]);
                            }
                        }
                        this.updateSuggestions(suggestionHolder);
                    } else {
                        console.log('Error getting suggestions', error);
                    }
                });
            }
    }
    setUser(data){
        this.userId = data.id;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount(){
        this.setUser(this.props.user['userInfo']);
        const data = {
            workId: this.state.workId
        };
        ajax.post( PathHelper.apiPath + '/works/display')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const data ={
                        id: response.body.work.id,
                        image: {
                            colors: JSON.parse(response.body.image.colors),
                            format: response.body.image.format,
                            grayscale: response.body.image.grayscale,
                            height: response.body.image.height,
                            id: response.body.image.id,
                            url: response.body.image.url,
                            width: response.body.image.width
                        },
                        tags: response.body.tags
                    };
                    this.loadSuggestions(response.body.tags);
                    this.props.loadArtwork(data);
                } else {
                    console.log('Error', error);
                }
            });

    }
    render(){
        let tagOptions = null;
        let suggestionsOptions = null;
        if(this.state.work) {
            const t = this.state.work.tags;
            tagOptions = t.map((tag, index) => (
                <Tag
                    word={tag.word}
                    key={tag.id +'_tag'+ index}
                    ontology={tag.ontology}
                    id={tag.id}
                    isEditable={true}
                    clickActions={[{label: 'reject', icon: 'remove', action: this.temp}]}
                />
            ));
        }
        if(this.state.suggestions){
                const s = this.state.suggestions;
                suggestionsOptions = s.map((suggestion, index) => (
                    <Suggestion
                        id={suggestion.id}
                        prompt={suggestion.prompt}
                        key={suggestion.prompt+'_suggestion'+index}
                        meaningId={suggestion.meaningId}
                    />
                ));

        }
        return(
            <Segment>
                {  this.state.work ?
                    <Container>
                        <Container textAlign={'center'}>
                            <Image
                                src={this.state.work.image.url}
                                width={this.state.work.image.width}
                                height={this.state.work.image.height}
                                centered={true}
                                bordered={true}
                            />
                            <Button.Group className="art-bottom-controls">
                                <Button basic={true} onClick={() => this.state.browseBasedOnThis()}>Start Journey Based on this Work</Button>
                                <Button basic={true} onClick={() => this.state.userNameClicked()}>User Name</Button>
                                <Button basic={true} onClick={() => this.state.moreLikeThis()}>More Like This</Button>
                                <Button basic={true} onClick={() => this.state.relatedToMe()}>Show My Work Related to This</Button>
                            </Button.Group>
                        </Container>
                        <Divider/>
                        <h2>Detected in this image:</h2>
                        <p>Click the add or reject buttons to label your work.</p>
                        <div>{tagOptions}</div>
                        <h2>Suggestions from this image</h2>
                        <Card.Group itemsPerRow={4}>
                            {suggestionsOptions}
                        </Card.Group>
                    </Container> : null
                }
            </Segment>
        )
    }
}

Artwork.propTypes = {
    loadArtwork: PropTypes.func.isRequired,
    getSuggestions: PropTypes.func.isRequired,
    browseBasedOnThis: PropTypes.func.isRequired,
    relatedToMe: PropTypes.func.isRequired,
    moreLikeThis: PropTypes.func.isRequired,
    userNameClicked: PropTypes.func.isRequired,
    workId: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    }),
    work: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.shape({
            colors: PropTypes.any,
            format: PropTypes.string,
            grayscale: PropTypes.bool,
            height: PropTypes.number,
            id: PropTypes.string,
            url: PropTypes.string,
            width: PropTypes.number
        }),
        tags: PropTypes.any,
    }),
    suggestions: PropTypes.any
};

const mapDispatchToProps = (dispatch) => {
    return {
        browseBasedOnThis: () => {
            dispatch(ArtworkActions.browseBasedOnThis())
        },
        relatedToMe: () => {
            dispatch(ArtworkActions.relatedToMe())
        },
        moreLikeThis: () => {
            dispatch(ArtworkActions.moreLikeThis())
        },
        userNameClicked: () => {
            dispatch(ArtworkActions.userNameClicked())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Artwork'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Artwork);