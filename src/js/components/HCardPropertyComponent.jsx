import React from 'react';
import PropTypes from 'prop-types';
import HCardProperty from '../HCardProperty';

/**
 * Class storing details specific to a HCard property component
 */
class HCardPropertyComponent extends React.Component {
    /**
     * Renders a HCard property element specific to a singular property
     *
     * @param value The value of the property
     * @returns {*}
     */
    renderSingular = ({ value }) => (
        <>
            { value }
        </>
    );

    /**
     * Renders a Telephone HCard property element
     *
     * @param value The value of the property
     * @returns {*}
     */
    renderTelephone = ({ value }) => (
        <>
            <span className="type">Home</span>
            { value }
        </>
    );

    render() {
        const { hCardProperty } = this.props;

        let renderedElement;

        if (hCardProperty.name === 'tel') {
            renderedElement = this.renderTelephone(hCardProperty);
        } else {
            renderedElement = this.renderSingular(hCardProperty);
        }

        return (
            <span title={hCardProperty.value} className={hCardProperty.name}>
                { renderedElement }
            </span>
        );
    }
}

HCardPropertyComponent.propTypes = {
    hCardProperty: PropTypes.instanceOf(HCardProperty).isRequired,
};

export default HCardPropertyComponent;
