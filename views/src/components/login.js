import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react'

const LogIn = props => {
    return (
        <Button>
            {props.user}
        </Button>
    );
};

LogIn.propTypes = {
    user: PropTypes.string.isRequired,
};

export default LogIn;

