import React from 'react'
import PropTypes from 'prop-types';
import {Card, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
const img = require('!!url-loader!../../assets/img/notebook_basic.jpg');

const NotebookTout = props => {
    const setMe = function(){
      return props.linkToNotebook();
    };
    return (

            <Card className={props.isActive ? 'notebook-tout active-notebook' : 'notebook-tout'}>
                <Image className="notebook-tout-image" src={img}/>
                <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                    <Card.Description>
                        {props.isActive ?
                            <div>
                                Current Notebook.
                            </div>
                            :
                            <div>
                                <a onClick={() => setMe()}>Make current notebook.</a>
                            </div>
                        }
                        <Link to={'/notebooks/'+props.id} className="notebook-tout-link">View</Link>
                    </Card.Description>
                </Card.Content>
            </Card>

    )
};

NotebookTout.propTypes = {
    name: PropTypes.string.isRequired,
    linkToNotebook: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};

export default NotebookTout;