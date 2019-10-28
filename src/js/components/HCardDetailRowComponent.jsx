import React from 'react';
import PropTypes from 'prop-types';
import HCardDetailRow from '../HCardDetailRow';
import HCardPropertyComponent from './HCardPropertyComponent';

const HCardDetailRowComponent = ({ hCardDetailRow }) => (
    <li className={`flex-row flex-row--columns-${hCardDetailRow.details.length}`}>
        {
            hCardDetailRow.details.map((detail) => (
                <div className="detail flex-column" key={detail.id}>
                    <div>
                        <span className="label">{ detail.label }</span>
                        <span className="value">
                            {
                                detail.properties.filter((property) => property.value)
                                    .map((property) => (
                                        <HCardPropertyComponent
                                            key={property.name}
                                            hCardProperty={property}
                                        />
                                    )).flatMap((value, index, array) => (
                                        // Add in the separator element
                                        array.length - 1 !== index
                                            ? [value, detail.propertiesSeparator]
                                            : value
                                    ))
                            }
                        </span>
                    </div>
                </div>
            ))
        }
    </li>
);

HCardDetailRowComponent.propTypes = {
    hCardDetailRow: PropTypes.instanceOf(HCardDetailRow).isRequired,
};

export default HCardDetailRowComponent;
