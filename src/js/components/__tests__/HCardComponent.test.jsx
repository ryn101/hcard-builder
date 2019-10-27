import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCard from '../../HCard';
import HCardComponent from '../HCardComponent';
import Unique from '../../Unique';

configure({ adapter: new Adapter() });

beforeAll(() => {
    Unique.resetCounters();
});

it('renders the hCard without crashing', () => {
    const hCard = new HCard();
    const div = document.createElement('div');
    ReactDOM.render(<HCardComponent hCard={hCard} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once the hcard has rendered', () => {
    let hCardNode;
    let hCard;

    beforeEach(() => {
        hCard = new HCard();
        hCardNode = shallow(<HCardComponent hCard={hCard} />);
    });

    it('renders with state correctly', () => {
        expect(hCardNode).toMatchSnapshot();
    });

    it('renders the full name correctly', () => {
        const givenName = 'Ryan';
        const surname = 'O\'Connor';

        hCard.personalDetails.givenName = givenName;
        hCard.personalDetails.surname = surname;
        hCardNode.setProps({ hCard });
        hCardNode.update();

        const fullNameNode = hCardNode.find('.fn');
        expect(fullNameNode.text()).toEqual(`${givenName} ${surname}`);
    });

    it('set the avatar file url', () => {
        const avatarFileUrl = '/images/test.png';
        hCardNode.setProps({ avatarFileUrl });
        hCardNode.update();

        const photoNode = hCardNode.find('.photo');
        expect(photoNode.prop('src')).toEqual(avatarFileUrl);
    });
});
