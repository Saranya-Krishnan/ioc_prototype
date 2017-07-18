import React from 'react'
import PropTypes from 'prop-types';
import {Label } from 'semantic-ui-react';
import FontAwesome from 'react-fontawesome';

const Tags = props => {
    let buttons = null;

    if(props.clickActions){
        const btns = props.clickActions;
        buttons = btns.map((b, index) => (
            <FontAwesome name={b.icon} icon key={index} onClick={() => b.action} aria-label={b.label} className="remove-tag-icon"/>
        ));
    }
    return (
        <div className="tag">
            {props.isEditable ?
            <Label className="tag-label">
                {props.word}
                {buttons}
            </Label>
                :<Label className="tag-label">
                    {props.word}
                </Label>
            }
        </div>
    )
};

Tags.propTypes = {
    word: PropTypes.string.isRequired,
    ontology: PropTypes.string,
    id: PropTypes.string.isRequired,
    isEditable: PropTypes.bool.isRequired,
    clickActions: PropTypes.arrayOf(PropTypes.shape({
        label:PropTypes.string,
        icon: PropTypes.string,
        action:PropTypes.func
    }))
};

export default Tags;