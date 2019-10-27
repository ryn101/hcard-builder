/**
 * Configured types of hCard properties used as a lookup for value safety
 *
 * @type {{
 *    country: string,
 *    streetAddress: string,
 *    postalCode: string,
 *    locality: string,
 *    telephone: string,
 *    region: string,
 *    email: string
 *  }}
 */
const hCardPropertyType = {
    email: 'email',
    telephone: 'tel',
    streetAddress: 'street-address',
    locality: 'locality',
    region: 'region',
    postalCode: 'postal-code',
    country: 'country',
};

/**
 * Container for a HCard specific property
 */
class HCardProperty {
    /**
     * Constructor
     *
     * @param name The property name/type
     * @param value The value of the property
     */
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

export { hCardPropertyType as HCardPropertyType };
export default HCardProperty;
