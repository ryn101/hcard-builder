/**
 * Class which encapsulates the logic to parse an Australian state from an abbreviation.
 *
 * @property abbreviation - The original abbreviation if a matching state is found
 * @property name - The name of the state set to either the name if found
 *                  or the original abbreviation
 */
class AddressState {
    constructor(abbreviation) {
        let stateName;
        const cleanedAbbreviation = abbreviation ? abbreviation.toUpperCase() : null;

        switch (cleanedAbbreviation) {
            case 'NSW':
                stateName = 'New South Wales';
                break;
            case 'QLD':
                stateName = 'Queensland';
                break;
            case 'ACT':
                stateName = 'Australian Capital Territory';
                break;
            case 'VIC':
                stateName = 'Victoria';
                break;
            case 'SA':
                stateName = 'South Australia';
                break;
            case 'WA':
                stateName = 'Western Australia';
                break;
            case 'TAS':
                stateName = 'Tasmania';
                break;
            case 'NT':
                stateName = 'Northern Territory';
                break;
            default:
                stateName = null;
        }

        this.abbreviation = stateName ? abbreviation : null;
        this.name = stateName || abbreviation;
    }
}

export default AddressState;
