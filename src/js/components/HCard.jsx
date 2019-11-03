import React from 'react';
import PropTypes from 'prop-types';
import HCardDetails from '../HCardDetails';

import '../../scss/HCard.scss';
import profilePicture from '../../images/profile-default.png';
import HCardProperty from './HCardProperty';
import HCardDetail from './HCardDetail';
import AddressState from '../AddressState';

function HCard(props) {
    const { hCard, avatarFileUrl } = props;
    const streetAddress = [hCard.houseNameOrNumber, hCard.street].filter(Boolean).join(' ');
    const fullName = [hCard.givenName, hCard.surname].filter(Boolean).join(' ');
    const state = new AddressState(hCard.state);

    return (
        <section className="vcard">
            <header className="vcard__header">
                <h2 className="vcard__heading fn" title={fullName}>{fullName}</h2>
                <figure className="vcard__photo-wrapper">
                    <img alt="avatar" className="photo" src={avatarFileUrl} />
                </figure>
            </header>
            <span className="vcard__banner">HCARD PREVIEW</span>
            <dl className="vcard__details adr">
                <HCardDetail label="Email">
                    <HCardProperty name="email" value={hCard.email} />
                </HCardDetail>
                <HCardDetail label="Phone">
                    <HCardProperty name="tel">
                        <HCardProperty name="type" value="home" />
                        { hCard.phone }
                    </HCardProperty>
                </HCardDetail>
                <HCardDetail label="Address">
                    <HCardProperty name="street-address" value={streetAddress} />
                </HCardDetail>
                <HCardDetail>
                    <HCardProperty name="locality" value={hCard.suburb} />
                    <span>{hCard.suburb && hCard.state ? ', ' : ''}</span>
                    <HCardProperty name="region" value={state.name} abbreviation={state.abbreviation} />
                </HCardDetail>
                <HCardDetail label="Post Code" columns={2}>
                    <HCardProperty name="postal-code" value={hCard.postcode} />
                </HCardDetail>
                <HCardDetail label="Country" columns={2}>
                    <HCardProperty name="country" value={hCard.country} />
                </HCardDetail>
            </dl>
        </section>
    );
}

HCard.propTypes = {
    hCard: PropTypes.instanceOf(HCardDetails).isRequired,
    avatarFileUrl: PropTypes.string,
};

HCard.defaultProps = {
    avatarFileUrl: profilePicture,
};

export default HCard;
