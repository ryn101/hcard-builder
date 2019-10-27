/**
 * Container for HCard specific information
 */
class HCard {
    constructor(
        givenName,
        surname,
        email,
        phone,
        houseNumber,
        street,
        suburb,
        state,
        postcode,
        country,
    ) {
        this.personalDetails = {
            givenName,
            surname,
            email,
            phone,
        };

        this.address = {
            houseNumber,
            street,
            suburb,
            state,
            postcode,
            country,
        };

        Object.defineProperty(this, 'fullName', {
            enumerable: false,
            get: () => [this.personalDetails.givenName, this.personalDetails.surname].filter(Boolean).join(' '),
        });
    }

    /**
     * Returns the full name being a combination of given and surnames
     *
     * @returns {string}
     */
    fullName = () => {
        const { givenName, surname } = this.personalDetails;
        return [givenName, surname].filter(Boolean).join(' ');
    }
}

export default HCard;
