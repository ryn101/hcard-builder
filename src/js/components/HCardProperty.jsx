import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps up the logic needed to display a hCard property. The name of the property is added
 * as a class to the component and the title is set to the specified value.
 *
 * Additionally supports property nesting, and abbreviation declaration for use with the abbr tag.
 * If child elements are provided then the value and abbreviation properties are disregarded.
 */
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
