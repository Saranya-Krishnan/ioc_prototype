import React from 'react';
import PropTypes from 'prop-types';

const LogIn = props => {
    return (
        <div className="user">
            {props.user}
        </div>
    );
};

LogIn.propTypes = {
    user: PropTypes.string.isRequired,
};

export default LogIn;

