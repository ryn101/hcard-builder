import React, { Component } from 'react';
import _ from 'lodash';
import '../../scss/App.scss';
import BuilderGroup from '../BuilderGroup';
import HCard from '../HCard';
import BuilderGroupComponent from './BuilderGroupComponent';
import HCardComponent from './HCardComponent';

class App extends Component {
    constructor(props) {
        super(props);

        const hCard = new HCard();

        // Specify overrides for detail names
        const detailNameOverrides = {
            houseNumber: 'House Name or #',
        };

        // Build the groups and their corresponding details based off the hCard class properties
        // This is only needed to be constructed once, hence located within the constructor,
        // as the properties of the hCard are assumed to not change once initialised.
        const builderGroups = Object.entries(hCard)
            .map(([hCardSectionName, hCardSectionDetails]) => {
                const builderGroup = new BuilderGroup(
                    _.startCase(hCardSectionName),
                    hCardSectionName,
                );

                // Build the group details
                Object.entries(hCardSectionDetails)
                    .forEach(([hCardDetailName, hCardDetailValue]) => {
                        builderGroup.addDetail(
                            detailNameOverrides[hCardDetailName] || _.startCase(hCardDetailName),
                            hCardDetailName,
                            hCardDetailValue,
                        );
                    });

                return builderGroup;
            });

        this.state = { builderGroups, hCard };
    }

    /**
     * Event for handling the update of an individual builder group detail component
     *
     * @param groupModel The builder group model name
     * @param detailModel The builder group detail model name
     * @param modelValue The builder group detail updated model value
     */
    onDetailUpdated = (groupModel, detailModel, modelValue) => {
        const { hCard } = this.state;
        hCard[groupModel][detailModel] = modelValue;

        this.setState({ hCard });
    };

    /**
     * Event for handling the selection of an avatar via the file input
     *
     * @param event The file input selection event
     */
    onAvatarSelected = (event) => {
        const { avatarFileUrl } = this.state;

        if (avatarFileUrl) {
            URL.revokeObjectURL(avatarFileUrl);
        }

        this.setState({
            avatarFileUrl: URL.createObjectURL(event.target.files[0]),
        });
    };

    render() {
        const { builderGroups, hCard, avatarFileUrl } = this.state;

        return (
            <>
                <section>
                    <h1>hCard Builder</h1>
                    {
                        builderGroups.map((bg) => (
                            <BuilderGroupComponent
                                key={bg.id}
                                builderGroup={bg}
                                modelValue={hCard}
                                onDetailUpdated={this.onDetailUpdated}
                            />
                        ))
                    }
                    <div className="    flex-row flex-row--responsive flex-row--columns-2">
                        <div className="flex-column">
                            {/* eslint-disable-next-line */}
                            <label className="button button--grey file-upload-wrapper">
                                <input onChange={this.onAvatarSelected} type="file" />
                                <span>Upload Avatar</span>
                            </label>
                        </div>
                        <div className="flex-column">
                            <span className="button button--blue">Create hCard</span>
                        </div>
                    </div>
                </section>
                <div>
                    <HCardComponent hCard={hCard} avatarFileUrl={avatarFileUrl} />
                </div>
            </>
        );
    }
}

export default App;