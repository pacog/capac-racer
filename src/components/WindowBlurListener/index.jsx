import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Set the name of the hidden property and the change event for visibility
let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

function WindowBlurListener({ onBlur }) {
    useEffect(() => {
        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (
            typeof document.addEventListener === 'undefined' ||
            hidden === undefined
        ) {
            return () => {}; // not supported
        }

        const handleVisibilityChange = () => {
            if (document[hidden]) {
                onBlur();
            }
        };
        document.addEventListener(
            visibilityChange,
            handleVisibilityChange,
            false,
        );
        return () => {
            document.removeEventListener(
                visibilityChange,
                handleVisibilityChange,
                false,
            );
        };
    }, [onBlur]);
    return <></>;
}

WindowBlurListener.propTypes = {
    onBlur: PropTypes.func.isRequired,
};

export default WindowBlurListener;
