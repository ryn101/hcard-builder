import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonComponent from '../ButtonComponent';

configure({ adapter: new Adapter() });

it('renders the button component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <ButtonComponent>Button Text</ButtonComponent>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    const buttonText = 'Button Text';
    const buttonColour = 'blue';
    const getButtonColour = (colour) => `button--${colour}`;
    let buttonNode;

    beforeEach(() => {
        buttonNode = shallow(
            <ButtonComponent colour={buttonColour}>{buttonText}</ButtonComponent>,
        );
    });

    it('renders with state correctly', () => {
        expect(buttonNode).toMatchSnapshot();
    });

    it('defaults to the grey colour', () => {
        const greyColour = 'grey';
        buttonNode.setProps({ colour: greyColour });

        expect(buttonNode.hasClass(getButtonColour(greyColour))).toBeTruthy();
    });

    it('contains the correct props', () => {
        expect(buttonNode.text()).toEqual(buttonText);
        expect(buttonNode.hasClass(getButtonColour(buttonColour))).toBeTruthy();
    });

    it('supports different tags', () => {
        const tag = 'span';
        buttonNode.setProps({ tag });

        expect(buttonNode.name()).toEqual(tag);
    });
});
