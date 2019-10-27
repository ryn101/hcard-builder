import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuilderGroupComponent from '../BuilderGroupComponent';
import BuilderGroup from '../../BuilderGroup';

const builderGroup = new BuilderGroup('Test');
builderGroup.addDetail('Test Detail', 'testDetail');
builderGroup.addDetail('Another Detail', 'anotherDetail');

configure({ adapter: new Adapter() });

it('renders the builder group without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BuilderGroupComponent builderGroup={builderGroup} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once the builder group has rendered', () => {
    let builderGroupNode;

    beforeEach(() => {
        builderGroupNode = shallow(<BuilderGroupComponent builderGroup={builderGroup} />);
    });

    it('renders with state correctly', () => {
        expect(builderGroupNode).toMatchSnapshot();
    });

    it('renders the title correctly', () => {
        const titleNode = builderGroupNode.find('h2');
        expect(titleNode.text()).toEqual(builderGroup.title);
    });
});
