import Unique from './Unique';

/**
 * Class for storing details specific to a HCard detail component
 */
class HCardDetail extends Unique {
    /**
     * Constructor
     *
     * @param label The description of the detail
     * @param {HCardProperty|[HCardProperty]} properties Either a singular or an array of
     *                                                   HCardProperty objects
     * @param propertiesSeparator The separator which should separate each property
     */
    constructor(label, properties, propertiesSeparator) {
        super('hcd');

        let propertiesArray = properties;

        if (!Array.isArray(propertiesArray)) {
            propertiesArray = [propertiesArray];
        }

        this.label = label;
        this.properties = propertiesArray;
        this.propertiesSeparator = propertiesSeparator;
    }
}

export default HCardDetail;
