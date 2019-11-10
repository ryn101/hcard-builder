import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Wraps up the logic needed to display a hCard property. The name of the property is added
 * as a class to the component and the title is set to the specified value.
 *
 * Additionally supports property nesting, and abbreviation declaration for use with the abbr tag.
 * If the abbreviation tag is provided then the as property is disregarded.
 * If child elements are provided then the value and abbreviation properties are disregarded.
 *
 * When requiring a HTML tag other than a span, the as property can be specified.
 */
function HCardProperty(props) {
    const {
        name,
        value,
        abbreviation,
        as,
        className,
        children,
    } = props;

    const ElementTag = as;
    let element;

    if (children || !abbreviation) {
        // If children are specified or no abbreviation value is specified then use the element tag
        element = (
            <ElementTag title={value} className={classNames(name, className)}>
                { children || value }
            </ElementTag>
        );
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
    as: PropTypes.string,
    className: PropTypes.string,
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
    as: 'span',
    className: '',
    children: null,
};

export default HCardProperty;
