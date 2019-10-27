import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HCard from '../HCard';
import HCardDetailRow from '../HCardDetailRow';
import HCardDetailRowComponent from './HCardDetailRowComponent';
import HCardProperty, { HCardPropertyType } from '../HCardProperty';

import '../../scss/HCard.scss';
import profilePicture from '../../images/profile-default.png';

class HCardComponent extends Component {
    constructor() {
        super();

        this.hCardProps = Object.values(HCardPropertyType).reduce((result, name) => {
            // eslint-disable-next-line no-param-reassign
            result[name] = new HCardProperty(name);

            return result;
        }, {});

        this.hCardRows = [
            new HCardDetailRow().addDetail('Email', this.hCardProps[HCardPropertyType.email]),
            new HCardDetailRow().addDetail('Phone', this.hCardProps[HCardPropertyType.telephone]),
            new HCardDetailRow().addDetail('Address', this.hCardProps[HCardPropertyType.streetAddress]),
            new HCardDetailRow().addDetail('', [
                this.hCardProps[HCardPropertyType.locality],
                this.hCardProps[HCardPropertyType.region],
            ], ', '),
            new HCardDetailRow()
                .addDetail('Postcode', this.hCardProps[HCardPropertyType.postalCode])
                .addDetail('Country', this.hCardProps[HCardPropertyType.country]),
        ];
    }

    /**
     * Updates the hCardProperty values
     *
     * @param hCard
     * @returns HCardDetailRow[]
     */
    updateHCardProperties = (hCard) => {
        const { email, phone } = hCard.personalDetails;
        const {
            houseNumber,
            street,
            suburb,
            state,
            postcode,
            country,
        } = hCard.address;

        // noinspection JSPrimitiveTypeWrapperUsage
        this.hCardProps[HCardPropertyType.email].value = email;
        this.hCardProps[HCardPropertyType.telephone].value = phone;
        this.hCardProps[HCardPropertyType.streetAddress].value = [houseNumber, street].filter(Boolean).join(' ');
        this.hCardProps[HCardPropertyType.locality].value = suburb;
        this.hCardProps[HCardPropertyType.region].value = state;
        this.hCardProps[HCardPropertyType.postalCode].value = postcode;
        this.hCardProps[HCardPropertyType.country].value = country;
    };

    /**
     * Render the individual detail row components
     *
     * @param detailRows
     * @returns {HCardDetailRowComponent}
     */
    renderDetails = (detailRows) => detailRows.map((detailRow) => (
        <HCardDetailRowComponent key={detailRow.id} hCardDetailRow={detailRow} />
    ));

    render() {
        const { hCard, avatarFileUrl } = this.props;
        this.updateHCardProperties(hCard);

        return (
            <div className="vcard">
                <span className="banner">HCARD PREVIEW</span>
                <div className="header">
                    <h1 className="fn" title={hCard.fullName}>{ hCard.fullName }</h1>
                    <div className="photo-wrapper">
                        <img alt="avatar" className="photo" src={avatarFileUrl} />
                    </div>
                </div>
                <div className="adr details">
                    <ul>
                        {
                            this.renderDetails(this.hCardRows)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

HCardComponent.propTypes = {
    hCard: PropTypes.instanceOf(HCard).isRequired,
    avatarFileUrl: PropTypes.string,
};

HCardComponent.defaultProps = {
    avatarFileUrl: profilePicture,
};

export default HCardComponent;
