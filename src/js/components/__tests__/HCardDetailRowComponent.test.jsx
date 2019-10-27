import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardDetailRowComponent from '../HCardDetailRowComponent';
import HCardDetailRow from '../../HCardDetailRow';
import HCardProperty from '../../HCardProperty';

configure({ adapter: new Adapter() });

beforeAll(() => {
    HCardDetailRow.resetCounters();
});

it('renders the hCard detail row without crashing', () => {
    const hCardDetailRow = new HCardDetailRow();
    const div = document.createElement('div');
    ReactDOM.render(<HCardDetailRowComponent hCardDetailRow={hCardDetailRow} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once the hcard detail row has rendered', () => {
    let hCardDetailRowNode;
    const hCardDetailRow = new HCardDetailRow()
        .addDetail('Detail 1', [new HCardProperty('Prop1', 'Value1')]);

    beforeEach(() => {
        hCardDetailRowNode = shallow(<HCardDetailRowComponent hCardDetailRow={hCardDetailRow} />);
    });

    it('renders with state correctly', () => {
        expect(hCardDetailRowNode).toMatchSnapshot();
    });

    it('renders the required details', () => {
        const detailNodes = hCardDetailRowNode.find('.detail');
        expect(detailNodes).toHaveLength(hCardDetailRow.details.length);

        const detailNode = detailNodes.first();
        const detail = hCardDetailRow.details[0];

        expect(detailNode.find('.label').text()).toEqual(detail.label);

        const valueChildNodes = detailNode.find('.value').children();
        expect(valueChildNodes).toHaveLength(detail.properties.length);
    });
});
