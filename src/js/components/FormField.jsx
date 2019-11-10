import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Component that acts as a wrapper for the creation of a label and it's associated input field.
 * This component has two forms:
 *
 * - Shorthand - Allows the creation of the component without the need to specify a
 *               input as a child as this is auto generated. When using this form,
 *               the two supported properties of `onFieldChange` and `type` will be applied
 *               directly on the input.
 * - Nested - Used for finer attribute control of the input. This requires an explicit
 *            declaration of an input as a child of this component.
 *
 * In both forms, the fieldId will be applied to the input as it's id.
 */
function FormField({
    fieldId, as, label, children, type, onFieldChange, className,
}) {
    const FormFieldTag = as;

    return (
        <FormFieldTag className={classNames('form__field', className)}>
            {
                // Optionally render the label if the property is provided
                label ? <label className="form__label" htmlFor={fieldId}>{label}</label> : ''
            }
            {
                children
                    // If a child input element is provided, then set the field id
                    ? React.cloneElement(children, { id: fieldId })
                    : <input id={fieldId} type={type} onChange={onFieldChange} />
            }
        </FormFieldTag>
    );
}

FormField.propTypes = {
    fieldId: PropTypes.string.isRequired,
    as: PropTypes.oneOf(['div', 'li', 'p']),
    label: PropTypes.string,
    children: PropTypes.element,
    type: PropTypes.string,
    onFieldChange: PropTypes.func,
    className: PropTypes.string,
};

FormField.defaultProps = {
    as: 'div',
    label: '',
    children: null,
    type: 'text',
    onFieldChange: () => {},
    className: '',
};

export default FormField;
