import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function KeyPressListener({ keys }) {
    useEffect(() => {
        const onKeyPress = (event) => {
            if (keys[event.code]) {
                keys[event.code]();
            }
        };
        window.document.addEventListener('keyup', onKeyPress);

        return () => {
            window.document.removeEventListener('keyup', onKeyPress);
        };
    }, [keys]);
    return <></>;
}

KeyPressListener.propTypes = {
    keys: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default KeyPressListener;
