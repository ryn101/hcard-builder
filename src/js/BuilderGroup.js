import Unique from './Unique';
import BuilderGroupDetail from './BuilderGroupDetail';

/**
 * Class for storing builder group specific information
 */
class BuilderGroup extends Unique {
    constructor(title, modelName = null, details = []) {
        super('bg');
        this.title = title;
        this.modelName = modelName;
        this.details = details;
    }

    addDetail(description, modelName) {
        this.details.push(new BuilderGroupDetail(description, modelName));
    }
}

export default BuilderGroup;
