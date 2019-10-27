let uniqueMap = {};

/**
 * Class for providing a unique id to classes that extend it
 */
export default class Unique {
    constructor(uniqueIdPrefix) {
        if (typeof uniqueIdPrefix === 'undefined' || uniqueIdPrefix === null) {
            throw new Error('Classes extending Unique must provided a valid id prefix');
        }

        let uniqueIdCounter = uniqueMap[uniqueIdPrefix] || 1;
        this.id = `${uniqueIdPrefix}-${uniqueIdCounter}`;
        uniqueIdCounter += 1;

        uniqueMap[uniqueIdPrefix] = uniqueIdCounter;
    }

    static resetCounters() {
        uniqueMap = {};
    }
}
