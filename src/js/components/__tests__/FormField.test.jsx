import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormField from '../FormField';

configure({ adapter: new Adapter() });

const executeSuiteForJsxLiteral = (jsxLiteralCreator) => {
    let formFieldNode;
    const label = 'The input label description';
    const fieldId = 'formInput';
    const onFieldChange = jest.fn();

    beforeEach(() => {
        formFieldNode = shallow(jsxLiteralCreator(label, fieldId, onFieldChange));
    });

    it('renders with state correctly', () => {
        expect(formFieldNode).toMatchSnapshot();
    });

    it('renders the label correctly', () => {
        const labelSelector = '.form__label';
        const labelNode = formFieldNode.find(labelSelector);
        expect(labelNode.exists).toBeTruthy();
        expect(labelNode.text()).toEqual(label);

        formFieldNode.setProps({ label: null });
        expect(formFieldNode.find(labelSelector).exists()).toBeFalsy();
    });

    it('renders the children correctly', () => {
        const childNodes = formFieldNode.children();
        expect(childNodes).toHaveLength(2);

        const formInput = childNodes.find('input');
        expect(formInput.exists()).toBeTruthy();
        expect(formInput.prop('id')).toEqual(fieldId);
    });

    it('calls the on field update method when updating an input', () => {
        const formInput = formFieldNode.find('input');
        const changeEvent = { target: { id: fieldId, value: 'new value' } };
        formInput.simulate('change', changeEvent);
        expect(onFieldChange).toBeCalledTimes(1);
        expect(onFieldChange).toBeCalledWith(changeEvent);
    });
};

it('renders the form input group without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <FormField label="Title" fieldId="formInput" />,
        div,
    );

    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered shorthand', () => {
    executeSuiteForJsxLiteral((label, fieldId, onFieldChange) => (
        <FormField label={label} fieldId={fieldId} onFieldChange={onFieldChange} />
    ));
});

describe('once rendered', () => {
    executeSuiteForJsxLiteral((label, fieldId, onFieldChange) => (
        <FormField label={label} fieldId={fieldId}>
            <input onChange={onFieldChange} />
        </FormField>
    ));
});
