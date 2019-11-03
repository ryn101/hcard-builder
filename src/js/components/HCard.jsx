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
                <div className="vcard__photo-wrapper">
                    <img alt="avatar" className="photo" src={avatarFileUrl} />
                </div>
            </header>
            <span className="vcard__banner">HCARD PREVIEW</span>
            <address className="adr">
                <ul className="vcard__details">
                    <li className="vcard__details-row flex-row flex-row--columns-1">
                        <HCardDetail label="Email" className="flex-row__column">
                            <HCardProperty name="email" value={hCard.email} />
                        </HCardDetail>
                    </li>
                    <li className="vcard__details-row flex-row flex-row--columns-1">
                        <HCardDetail label="Phone" className="flex-row__column">
                            <HCardProperty name="tel">
                                <HCardProperty name="type" value="home" />
                                { hCard.phone }
                            </HCardProperty>
                        </HCardDetail>
                    </li>
                    <li className="vcard__details-row flex-row flex-row--columns-1">
                        <HCardDetail label="Address" className="flex-row__column">
                            <HCardProperty name="street-address" value={streetAddress} />
                        </HCardDetail>
                    </li>
                    <li className="vcard__details-row flex-row flex-row--columns-1">
                        <HCardDetail className="flex-row__column">
                            <HCardProperty name="locality" value={hCard.suburb} />
                            <span>{hCard.suburb && hCard.state ? ', ' : ''}</span>
                            <HCardProperty name="region" value={state.name} abbreviation={state.abbreviation} />
                        </HCardDetail>
                    </li>
                    <li className="vcard__details-row flex-row flex-row--columns-2">
                        <HCardDetail label="Post Code" className="flex-row__column">
                            <HCardProperty name="postal-code" value={hCard.postcode} />
                        </HCardDetail>
                        <HCardDetail label="Country" className="flex-row__column">
                            <HCardProperty name="country" value={hCard.country} />
                        </HCardDetail>
                    </li>
                </ul>
            </address>
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
