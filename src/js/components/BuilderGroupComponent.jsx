import React from 'react';
import PropTypes from 'prop-types';
import BuilderGroup from '../BuilderGroup';
import BuilderGroupDetailComponent from './BuilderGroupDetailComponent';

function BuilderGroupComponent(props) {
    const { builderGroup, onDetailUpdated, modelValue } = props;

    return (
        <section className="builder-group">
            <h2>{builderGroup.title}</h2>
            <ul className="flex-row flex-row--columns-2">
                {
                    builderGroup.details.map((bgd) => (
                        <BuilderGroupDetailComponent
                            key={bgd.id}
                            builderGroup={builderGroup}
                            builderGroupDetail={bgd}
                            modelValue={modelValue}
                            onDetailUpdated={onDetailUpdated}
                        />
                    ))
                }
            </ul>
        </section>
    );
}

BuilderGroupComponent.propTypes = {
    builderGroup: PropTypes.instanceOf(BuilderGroup).isRequired,
    onDetailUpdated: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    modelValue: PropTypes.object,
};

BuilderGroupComponent.defaultProps = {
    onDetailUpdated: () => {},
    modelValue: null,
};

export default BuilderGroupComponent;
