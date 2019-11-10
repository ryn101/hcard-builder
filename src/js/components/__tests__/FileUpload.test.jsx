import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileUpload from '../FileUpload';

configure({ adapter: new Adapter() });

it('renders the file upload component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <FileUpload id="fileUploadId" onFileSelection={() => {}}>Upload</FileUpload>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let fileUploadedNode;
    let fileSelected;
    let fileInput;
    const fileUploadId = 'fileUploadId';

    beforeEach(() => {
        fileSelected = jest.fn();
        fileUploadedNode = shallow(
            <FileUpload id={fileUploadId} onFileSelection={fileSelected}>Upload</FileUpload>,
        );
        fileInput = fileUploadedNode.find('input');
    });

    it('renders with state correctly', () => {
        expect(fileUploadedNode).toMatchSnapshot();
    });

    it('passes down the id attribute to the file input', () => {
        expect(fileInput.prop('id')).toEqual(fileUploadId);
    });

    it('calls on file selection method on file change', () => {
        fileInput.simulate('change', {});
        expect(fileSelected).toHaveBeenCalledTimes(1);
    });
});
