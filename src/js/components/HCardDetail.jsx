import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HCardDetail = ({ label, children, className }) => (
    <div className={classNames('detail', className)}>
        <div>
            <span className="detail__label">{ label }</span>
            <span className="detail__value">
                {
                    children
                }
            </span>
        </div>
    </div>
);

HCardDetail.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
};

HCardDetail.defaultProps = {
    label: null,
    className: '',
};

export default HCardDetail;
