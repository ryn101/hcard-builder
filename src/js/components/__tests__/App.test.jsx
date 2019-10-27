import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let appNode;

    beforeEach(() => {
        appNode = document.createElement('div');
        ReactDOM.render(<App />, appNode);
    });

    it('displays builder groups and their details', () => {
        const groups = appNode.querySelectorAll('.builder-group');
        expect(groups.length).toBeGreaterThan(0);

        groups.forEach((group) => {
            const details = group.querySelectorAll('ul li');
            expect(details.length).toBeGreaterThan(0);
        });
    });
});
