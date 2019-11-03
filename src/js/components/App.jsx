import React, { Component } from 'react';
import '../../scss/App.scss';
import HCard from './HCard';
import HCardDetails from '../HCardDetails';
import HCardBuilderComponent from './HCardBuilder';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hCard: new HCardDetails(),
            avatarFileUrl: undefined,
        };
    }

    /**
     * Event for handling the update of a hcard builder field
     */
    onFieldUpdate = (fieldId, fieldValue) => {
        const { hCard } = this.state;

        hCard[fieldId] = fieldValue;

        this.setState({ hCard });
    };

    /**
     * Event for handling the selection of an avatar via the file input
     *
     * @param fileUrl The file URL
     */
    onAvatarSelected = (fileUrl) => {
        const { avatarFileUrl } = this.state;

        if (avatarFileUrl) {
            URL.revokeObjectURL(avatarFileUrl);
        }

        this.setState({
            avatarFileUrl: URL.createObjectURL(fileUrl),
        });
    };

    onFormSubmission = (event) => event.preventDefault();

    render() {
        const { hCard, avatarFileUrl } = this.state;

        return (
            <>
                <HCardBuilderComponent
                    onFieldUpdate={this.onFieldUpdate}
                    onFormSubmission={this.onFormSubmission}
                    onAvatarSelected={this.onAvatarSelected}
                />
                <div className="hcard-preview">
                    <HCard hCard={hCard} avatarFileUrl={avatarFileUrl} />
                </div>
            </>
        );
    }
}

export default App;
