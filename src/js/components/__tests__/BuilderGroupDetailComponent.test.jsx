import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuilderGroupDetailComponent from '../BuilderGroupDetailComponent';
import BuilderGroupDetail from '../../BuilderGroupDetail';
import BuilderGroup from '../../BuilderGroup';

const builderGroup = new BuilderGroup('Test Group');
const builderGroupDetail = new BuilderGroupDetail('Test Detail', 'testDetail');

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BuilderGroupDetailComponent
            builderGroupDetail={builderGroupDetail}
            builderGroup={builderGroup}
        />,
        div,
    );

    ReactDOM.unmountComponentAtNode(div);
});

describe('once the builder group detail has rendered', () => {
    let builderGroupDetailNode;

    beforeEach(() => {
        builderGroupDetailNode = shallow(
            <BuilderGroupDetailComponent
                builderGroupDetail={builderGroupDetail}
                builderGroup={builderGroup}
            />,
        );
    });

    it('renders with state correctly', () => {
        expect(builderGroupDetailNode).toMatchSnapshot();
    });

    it('renders the title correctly', () => {
        const label = builderGroupDetailNode.find('label');
        expect(label.text()).toEqual(builderGroupDetail.description);
        expect(label.prop('htmlFor')).toEqual(builderGroupDetail.modelName);
    });

    it('renders the input correctly', () => {
        const input = builderGroupDetailNode.find('input');
        expect(input.prop('name')).toEqual(builderGroupDetail.modelName);
    });
});
