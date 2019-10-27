import Unique from './Unique';
import HCardDetail from './HCardDetail';

/**
 * Class storing details specific to a hCard detail row component
 */
class HCardDetailRow extends Unique {
    constructor() {
        super('hcdr');
        this.details = [];
    }

    /**
     * Adds a single detail to the HCardDetailRow component
     *
     * @param label The label for the detail
     * @param properties The properties to be formatted as a single line
     * @param propertiesSeparator The separator for the each hCard property
     * @returns {HCardDetailRow} Returns the HCardDetailRow instance
     */
    addDetail(label, properties, propertiesSeparator) {
        this.details.push(new HCardDetail(label, properties, propertiesSeparator));

        return this;
    }
}

export default HCardDetailRow;
