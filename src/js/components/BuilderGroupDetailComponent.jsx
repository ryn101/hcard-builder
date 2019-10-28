import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderGroupDetail from '../BuilderGroupDetail';
import BuilderGroup from '../BuilderGroup';

class BuilderGroupDetailComponent extends Component {
    onDetailUpdated = (event) => {
        const { builderGroup, builderGroupDetail, onDetailUpdated } = this.props;

        onDetailUpdated(builderGroup.modelName, builderGroupDetail.modelName, event.target.value);
    };

    render() {
        const {
            builderGroup: { modelName: groupModelName },
            builderGroupDetail: { description, modelName: detailModelName },
            modelValue,
        } = this.props;

        return (
            <li className="flex-column">
                <label htmlFor={detailModelName}>{description}</label>
                <input
                    name={detailModelName}
                    onChange={this.onDetailUpdated}
                    value={modelValue ? modelValue[groupModelName][detailModelName] || '' : ''}
                    type="text"
                />
            </li>
        );
    }
}

BuilderGroupDetailComponent.propTypes = {
    builderGroup: PropTypes.instanceOf(BuilderGroup).isRequired,
    builderGroupDetail: PropTypes.instanceOf(BuilderGroupDetail).isRequired,
    onDetailUpdated: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    modelValue: PropTypes.object,
};

BuilderGroupDetailComponent.defaultProps = {
    onDetailUpdated: () => {},
    modelValue: null,
};

export default BuilderGroupDetailComponent;
