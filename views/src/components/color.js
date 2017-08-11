import React from 'react'
import PropTypes from 'prop-types';

const Color = props => {
    const myColor = { backgroundColor: props.color};
    let textColor;
    const c = props.color.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    if (luma < 65) {
        textColor = { color: '#ffffff'}
    }else{
       textColor = { color: '#000000'}
    }
    return (
        <div className="color-sample" style={ myColor }>
            <h3 style={textColor}>{props.color}</h3>
        </div>
    )
};

Color.propTypes = {
    color: PropTypes.string.isRequired,
};

export default Color;