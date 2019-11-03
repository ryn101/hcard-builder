import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardDetail from '../HCardDetail';
import HCardProperty from '../HCardProperty';

configure({ adapter: new Adapter() });

it('renders the hCard detail without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <HCardDetail label="Label">
            <span />
        </HCardDetail>,
        div,
    );

    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let hCardDetailNode;
    const label = 'Detail label';
    const detailChildren = [
        <HCardProperty key="1" name="property-1" />,
        <span key="2" />,
        <HCardProperty key="2" name="property-2" />,
    ];

    beforeEach(() => {
        hCardDetailNode = shallow(
            <HCardDetail label={label}>
                {
                    detailChildren
                }
            </HCardDetail>,
        );
    });

    it('renders with state correctly', () => {
        expect(hCardDetailNode).toMatchSnapshot();
    });

    it('renders the label correctly', () => {
        const labelNode = hCardDetailNode.find('.detail__label');
        expect(labelNode.text()).toEqual(label);
    });

    it('renders the children correctly', () => {
        const valueNode = hCardDetailNode.find('.detail__value');
        expect(valueNode.exists()).toBeTruthy();

        const childNodes = valueNode.children();
        expect(childNodes).toHaveLength(detailChildren.length);
    });
});
