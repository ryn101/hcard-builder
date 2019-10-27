import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardProperty from '../../HCardProperty';
import HCardPropertyComponent from '../HCardPropertyComponent';

configure({ adapter: new Adapter() });

const expectBasicDetailsToBePopluated = (hCardPropertyNode, hCardProperty) => {
    expect(hCardPropertyNode.prop('title')).toEqual(hCardProperty.value);
    expect(hCardPropertyNode.hasClass(hCardProperty.name)).toBeTruthy();
};

it('renders the hCard property without crashing', () => {
    const hCardProp = new HCardProperty('prop1', 'value1');
    const div = document.createElement('div');
    ReactDOM.render(<HCardPropertyComponent hCardProperty={hCardProp} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once the hcard detail row has rendered', () => {
    let hCardPropertyNode;
    const hCardProperty = new HCardProperty();

    beforeEach(() => {
        hCardPropertyNode = shallow(<HCardPropertyComponent hCardProperty={hCardProperty} />);
    });

    it('renders with state correctly', () => {
        expect(hCardPropertyNode).toMatchSnapshot();
    });

    it('renders a singular property with the required details', () => {
        hCardProperty.name = 'Prop1';
        hCardProperty.value = 'Value1';
        hCardPropertyNode.setProps({ hCardProperty });
        hCardPropertyNode.update();

        expectBasicDetailsToBePopluated(hCardPropertyNode, hCardProperty);
        expect(hCardPropertyNode.text()).toEqual(hCardProperty.value);
    });

    it('renders a telephone property with the required details', () => {
        hCardProperty.name = 'tel';
        hCardProperty.value = '92825925';
        hCardPropertyNode.setProps({ hCardProperty });
        hCardPropertyNode.update();

        expectBasicDetailsToBePopluated(hCardPropertyNode, hCardProperty);
        const typeNode = hCardPropertyNode.find('.type');
        expect(typeNode).toHaveLength(1);
        expect(hCardPropertyNode.text()).toContain(hCardProperty.value);
    });
});
