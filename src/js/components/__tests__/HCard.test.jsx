import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HCardDetails from '../../HCardDetails';
import HCard from '../HCard';

configure({ adapter: new Adapter() });

it('renders the hCard without crashing', () => {
    const hCard = new HCardDetails();
    const div = document.createElement('div');
    ReactDOM.render(<HCard hCard={hCard} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('once rendered', () => {
    let hCardNode;
    let hCard;

    beforeEach(() => {
        hCard = new HCardDetails();
        hCardNode = shallow(<HCard hCard={hCard} />);
    });

    it('renders with state correctly', () => {
        expect(hCardNode).toMatchSnapshot();
    });

    it('renders the full name correctly', () => {
        const givenName = 'Ryan';
        const surname = 'O\'Connor';

        hCard.givenName = givenName;
        hCard.surname = surname;
        hCardNode.setProps({ hCard });

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
