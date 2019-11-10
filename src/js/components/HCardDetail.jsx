import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HCardDetail = ({ label, children, columns }) => (
    <div className={classNames('detail', `detail--columns-${columns}`)}>
        <dt className="detail__label">{ label }</dt>
        <dd className="detail__value">
            {
                children
            }
        </dd>
    </div>
);

HCardDetail.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    label: PropTypes.string,
    columns: PropTypes.oneOf([1, 2]),
};

HCardDetail.defaultProps = {
    label: null,
    columns: 1,
};

export default HCardDetail;
