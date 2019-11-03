import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormSection from '../FormSection';

configure({ adapter: new Adapter() });

it('renders the form section without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <FormSection title="Title">
            <span />
        </FormSection>,
        div,
    );

    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let formSectionNode;
    const sectionTitle = 'The title it should have';
    const SectionChildrenType = 'span';
    const sectionChildren = [
        <SectionChildrenType key="1" />,
        <SectionChildrenType key="2" />,
    ];

    beforeEach(() => {
        formSectionNode = shallow(
            <FormSection title={sectionTitle}>
                {
                    sectionChildren
                }
            </FormSection>,
        );
    });

    it('renders with state correctly', () => {
        expect(formSectionNode).toMatchSnapshot();
    });

    it('renders the title correctly', () => {
        const titleNode = formSectionNode.find('.form__title');
        expect(titleNode.text()).toEqual(sectionTitle);
    });

    it('renders the children correctly', () => {
        const childNodes = formSectionNode.children(SectionChildrenType);
        expect(childNodes).toHaveLength(2);
    });
});
