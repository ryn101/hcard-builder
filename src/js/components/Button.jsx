import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const validElementTags = ['span', 'div', 'button'];

function Button({
    children, colour, as, ...props
}) {
    const ButtonTag = as;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ButtonTag className={classNames('button', `button--${colour}`)} {...props}>
            { children }
        </ButtonTag>
    );
}

// noinspection JSUnusedGlobalSymbols
Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    colour: PropTypes.string,
    as: PropTypes.oneOf(validElementTags),
};

Button.defaultProps = {
    colour: 'grey',
    as: 'button',
};

export default Button;
