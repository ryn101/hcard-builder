import React from 'react';
import PropTypes from 'prop-types';

function FileUpload({ children, focusClass, onFileSelection }) {
    return (
        <span className="file-upload-wrapper">
            <input id="avatarFile" onChange={onFileSelection} type="file" accept="image/*" />
            <label htmlFor="avatarFile" className={focusClass}>{ children }</label>
        </span>
    );
}

FileUpload.propTypes = {
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
