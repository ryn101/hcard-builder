import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardProperty from '../HCardProperty';

configure({ adapter: new Adapter() });

it('renders the hCard property without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HCardProperty name="" />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once the hcard property has rendered', () => {
    let hCardPropertyNode;
    const propertyName = 'property-name';
    const propertyValue = 'Property Value';

    beforeEach(() => {
        hCardPropertyNode = shallow(
            <HCardProperty name={propertyName} value={propertyValue} />,
        );
    });

    it('renders with state correctly', () => {
        expect(hCardPropertyNode).toMatchSnapshot();
    });

    it('renders with the correct name and value', () => {
        // The title must equal the value
        expect(hCardPropertyNode.prop('title')).toEqual(propertyValue);

        // The node must have the name set as a class
        expect(hCardPropertyNode.hasClass(propertyName)).toBeTruthy();

        // The value must also be set as the text
        expect(hCardPropertyNode.text()).toEqual(propertyValue);
    });
});

describe('once the hcard property with nesting has rendered', () => {
    let hCardPropertyNode;
    const propertyName = 'property-name';
    const nestedProperty = <HCardProperty name="nested-property" value="Nested Value" />;

    beforeEach(() => {
        hCardPropertyNode = shallow(
            <HCardProperty name={propertyName}>
                { nestedProperty }
            </HCardProperty>,
        );
    });

    it('renders with nested state correctly', () => {
        expect(hCardPropertyNode).toMatchSnapshot();
    });

    it('renders with the correct name and nested element', () => {
        // The node must have the name set as a class
        expect(hCardPropertyNode.hasClass(propertyName)).toBeTruthy();

        // The children must be rendered
        expect(hCardPropertyNode.containsMatchingElement(nestedProperty));
    });
});
