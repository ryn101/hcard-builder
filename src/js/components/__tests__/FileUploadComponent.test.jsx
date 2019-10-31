import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileUploadComponent from '../FileUploadComponent';

configure({ adapter: new Adapter() });

it('renders the file upload component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <FileUploadComponent onFileSelection={()=>{}}>Upload</FileUploadComponent>,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let fileUploadedNode;
    let fileSelected;

    beforeEach(() => {
        fileSelected = jest.fn();
        fileUploadedNode = shallow(
            <FileUploadComponent onFileSelection={fileSelected}>Upload</FileUploadComponent>,
        );
    });

    it('renders with state correctly', () => {
        expect(fileUploadedNode).toMatchSnapshot();
    });

    it('calls on file selection method on file change', () => {
        const fileInput = fileUploadedNode.find('input');

        fileInput.simulate('change', {});
        expect(fileSelected).toHaveBeenCalledTimes(1);
    });
});
