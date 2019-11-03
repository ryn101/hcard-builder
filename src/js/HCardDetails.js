/**
 * Container for HCard detail information
 *
 * @property givenName - The first/given name
 * @property surname - The surname
 * @property email - The email
 * @property phone - The mobile/home/work phone number
 * @property houseNameOrNumber - The house/unit number/name
 * @property street - The street address
 * @property suburb - The address suburb
 * @property state - The address state
 * @property postcode - The address postcode
 * @property country - The address country
 */
class HCardDetails {
    constructor(
        givenName,
        surname,
        email,
        phone,
        houseNameOrNumber,
        street,
        suburb,
        state,
        postcode,
        country,
    ) {
        this.givenName = givenName;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.houseNameOrNumber = houseNameOrNumber;
        this.street = street;
        this.suburb = suburb;
        this.state = state;
        this.postcode = postcode;
        this.country = country;
    }
}

export default HCardDetails;
