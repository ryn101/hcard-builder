import Unique from './Unique';

/**
 * Class for storing builder group detail specific information
 */
class BuilderGroupDetail extends Unique {
    constructor(description, modelName) {
        super('bgd');
        this.description = description;
        this.modelName = modelName;
    }
}

export default BuilderGroupDetail;
