import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSection from './FormSection';
import FormField from './FormField';
import FileUpload from './FileUpload';
import Button from './Button';
import '../../scss/HCardBuilder.scss';

class HCardBuilderComponent extends Component {
    onFieldChange = ({ target }) => {
        const { onFieldUpdate } = this.props;

        onFieldUpdate(target.id, target.value);
    };

    onAvatarFileSelected = ({ target }) => {
        const { onAvatarSelected } = this.props;

        onAvatarSelected(target.files[0]);
    };

    render() {
        const { onFormSubmission } = this.props;

        return (
            <section className="hcard-builder">
                <h1 className="hcard-builder__title">hCard Builder</h1>

                <form name="hCardForm" className="form" onSubmit={onFormSubmission}>
                    <FormSection title="Personal Details">
                        <ul className="flex-row flex-row--columns-2">
                            <FormField as="li" label="Given Name" fieldId="givenName" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Surname" fieldId="surname" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Email" fieldId="email" type="email" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Phone" fieldId="phone" type="tel" onFieldChange={this.onFieldChange} className="flex-row__column" />
                        </ul>
                    </FormSection>
                    <FormSection title="Address">
                        <ul className="flex-row flex-row--columns-2">
                            <FormField as="li" label="House Name or #" fieldId="houseNameOrNumber" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Street" fieldId="street" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Suburb" fieldId="suburb" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="State" fieldId="state" onFieldChange={this.onFieldChange} className="flex-row__column" />
                            <FormField as="li" label="Postcode" fieldId="postcode" className="flex-row__column">
                                <input type="number" pattern="\d*" onChange={this.onFieldChange} />
                            </FormField>
                            <FormField as="li" label="Country" fieldId="country" onFieldChange={this.onFieldChange} className="flex-row__column" />
                        </ul>
                    </FormSection>
                    <div className="flex-row flex-row--columns-2">
                        <div className="flex-row__column form__button-wrapper">
                            <FileUpload onFileSelection={this.onAvatarFileSelected}>
                                <Button as="span">Upload Avatar</Button>
                            </FileUpload>
                        </div>
                        <div className="flex-row__column form__button-wrapper">
                            <Button type="submit" colour="blue">Create hCard</Button>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

HCardBuilderComponent.propTypes = {
    onFieldUpdate: PropTypes.func.isRequired,
    onFormSubmission: PropTypes.func.isRequired,
    onAvatarSelected: PropTypes.func.isRequired,
};

export default HCardBuilderComponent;
