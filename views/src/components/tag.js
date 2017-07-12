import React from 'react'
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const Tags = props => {
    let buttons = null;
    let definitions = null;

    if(props.ontology){
        let descriptions = [];
        const possibile = JSON.parse(props.ontology);
        for(let i=0; i< possibile.results.length; i++){
            if(possibile.results[i].description){
                descriptions.push({description:possibile.results[i].description});
            }
        }
        definitions = descriptions.map((d, index) => (
            <div key={index}>{d.description}</div>
        ));
    }


    if(props.clickActions){
        const btns = props.clickActions;
        buttons = btns.map((b, index) => (
            <button key={index} onClick={b.action}><i role="presentation" className={"tag-icon "+b.icon}></i>{b.label}</button>
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
            <Container>
                {definitions}
            </Container>
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