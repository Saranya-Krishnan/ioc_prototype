import React from 'react'
import PropTypes from 'prop-types';
import {Card } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const NotebookTout = props => {
    const setMe = function(){
      return props.linkToNotebook();
    };
    return (
        <div className="notebook-tout-wrapper">
            <Card onClick={() => setMe()} className={props.isActive ? 'notebook-tout active-notebook' : 'notebook-tout'}>
                <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                    <Card.Description>
                        {props.isActive ? 'Current Notebook' : null}
                    </Card.Description>
                </Card.Content>
            </Card>
            <Link to={'/notebooks/'+props.id} className="notebook-tout-link">View</Link>
        </div>
    )
};

NotebookTout.propTypes = {
    name: PropTypes.string.isRequired,
    linkToNotebook: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};

export default NotebookTout;