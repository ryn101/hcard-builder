import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const validElementTags = ['span', 'div', 'button'];

function ButtonComponent({
    children, colour, tag, ...props
}) {
    const ButtonTag = `${tag}`;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ButtonTag className={classNames('button', `button--${colour}`)} {...props}>
            { children }
        </ButtonTag>
    );
}

// noinspection JSUnusedGlobalSymbols
ButtonComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    colour: PropTypes.string,
    tag: (props, propName, componentName) => {
        const tagName = props[propName];
        let error = null;

        if (validElementTags.indexOf(tagName) === -1) {
            const allowedTags = validElementTags.join(', ');
            error = new Error(`${componentName} must have a valid tag name. Allowed tags are: ${allowedTags}`);
        }

        return error;
    },
};

ButtonComponent.defaultProps = {
    colour: 'grey',
    tag: 'button',
};

export default ButtonComponent;
