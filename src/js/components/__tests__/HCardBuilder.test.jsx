import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardBuilder from '../HCardBuilder';
import FileUpload from '../FileUpload';
import FormField from '../FormField';

configure({ adapter: new Adapter() });

it('renders the hCard builder without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <HCardBuilder
            onAvatarSelected={() => {}}
            onFieldUpdate={() => {}}
            onFormSubmission={() => {}}
        />,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let hCardBuilderNode;
    const onAvatarSelected = jest.fn();
    const onFieldUpdate = jest.fn();
    const onFormSubmission = jest.fn();

    beforeEach(() => {
        hCardBuilderNode = shallow(
            <HCardBuilder
                onFormSubmission={onFormSubmission}
                onAvatarSelected={onAvatarSelected}
                onFieldUpdate={onFieldUpdate}
            />,
        );
    });

    it('renders with state correctly', () => {
        expect(hCardBuilderNode).toMatchSnapshot();
    });

    it('calls the on form submission with the correct argument', () => {
        const eventObject = {
            target: {
                files: ['file'],
            },
        };

        hCardBuilderNode.find(FileUpload).prop('onFileSelection')(eventObject);
        expect(onAvatarSelected).toBeCalledTimes(1);
        expect(onAvatarSelected).toBeCalledWith(eventObject.target.files[0]);
    });

    it('calls the on field updated with the correct argument', () => {
        const eventObject = {
            target: {
                id: 'fieldId',
                value: 'fieldValue',
            },
        };

        hCardBuilderNode.find(FormField).first().prop('onFieldChange')(eventObject);
        expect(onFieldUpdate).toBeCalledTimes(1);
        expect(onFieldUpdate).toBeCalledWith(eventObject.target.id, eventObject.target.value);
    });

    it('calls the on form submitted', () => {
        const formNode = hCardBuilderNode.find('form');
        formNode.simulate('submit', { preventDefault: () => {} });

        expect(onFormSubmission).toBeCalledTimes(1);
    });
});
