import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import App from '../App';
import HCard from '../HCard';
import HCardBuilderComponent from '../HCardBuilder';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let appNode;

    beforeEach(() => {
        appNode = shallow(
            <App />,
        );
    });

    it('renders with state correctly', () => {
        expect(appNode).toMatchSnapshot();
    });

    it('displays the builder and hcard', () => {
        expect(appNode.exists(HCardBuilderComponent)).toBeTruthy();
        expect(appNode.exists(HCard)).toBeTruthy();
    });
});
