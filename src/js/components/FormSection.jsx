import React from 'react';
import PropTypes from 'prop-types';

function FormSection(props) {
    const { title, children } = props;

    return (
        <section className="form__section">
            <h2 className="form__title">{title}</h2>
            { children }
        </section>
    );
}

FormSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

export default FormSection;
