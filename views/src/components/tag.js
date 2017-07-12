import React from 'react'
import PropTypes from 'prop-types';

const Tags = props => {
    let buttons = null;
    if(props.clickActions){
        const btns = props.clickActions;
        buttons = btns.map((b, index) => (
            <button key={index} onClick={b.action}><i role="presentation" className={"tag-icon "+b.icon}></i>{b.label}</button>
        ));
    }
    return (
        <span className="tag">
            {props.isEditable ?
            <span className="tag-label">
                {props.word}
                {buttons}
            </span>
                :<span className="tag-label">
                    {props.word}
                </span>
            }
        </span>
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