import React from 'react';
import PropTypes from 'prop-types';

function FileUpload({
    id,
    children,
    focusClass,
    onFileSelection,
}) {
    return (
        <span className="file-upload-wrapper">
            <input id={id} onChange={onFileSelection} type="file" accept="image/*" />
            <label htmlFor={id} className={focusClass}>{ children }</label>
        </span>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    focusClass: PropTypes.string,
    onFileSelection: PropTypes.func.isRequired,
};

FileUpload.defaultProps = {
    focusClass: 'focusable',
};

export default FileUpload;
