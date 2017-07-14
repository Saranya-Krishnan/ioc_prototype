import React from 'react'
import PropTypes from 'prop-types';
import { Container, Button, Icon } from 'semantic-ui-react';

const Tags = props => {
    let buttons = null;

    if(props.clickActions){
        const btns = props.clickActions;
        buttons = btns.map((b, index) => (
            <Button icon key={index} onClick={b.action}><Icon name={b.icon}/>{b.label}</Button>
        ));
    }
    return (
        <Container className="tag">
            {props.isEditable ?
            <span className="tag-label">
                {props.word}
                {buttons}
            </span>
                :<span className="tag-label">
                    {props.word}
                </span>
            }
        </Container>
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