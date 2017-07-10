import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Link } from 'react-router-dom';
import { Segment, Image, Loader, Dimmer } from 'semantic-ui-react';
import * as EditArtworkActions from '../actions/edit-artwork_actions'
import PathHelper from '../helpers/path-helper';
import ArtWork from './art-work';


class EditWork extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
    }
    setUser(data){
        this.userId = data.id;
    }
    componentWillMount(){
        //Get artwork
    }
    render(){
        return(
            <div>
                <ArtWork/>
                Edit ArtWork
            </div>
        )
    }
}

EditWork.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        x: (y) => {
            dispatch(EditArtworkActions.x(y))
        },
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['EditWork'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWork);