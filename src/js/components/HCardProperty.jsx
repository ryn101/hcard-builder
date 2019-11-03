import React from 'react';
import PropTypes from 'prop-types';

function HCardProperty(props) {
    const {
        name,
        value,
        abbreviation,
        children,
    } = props;

    let element;

    if (children || !abbreviation) {
        // If children are specified or no abbreviation value is specified then use the default span
        element = (<span title={value} className={name}>{ children || value }</span>);
    } else {
        // If an abbreviation is specified then create an abbr tag instead
        element = (<abbr title={value} className={name}>{abbreviation}</abbr>);
    }

    return element;
}

HCardProperty.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    abbreviation: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
        ])),
    ]),
};

HCardProperty.defaultProps = {
    value: '',
    children: null,
};

export default HCardProperty;
