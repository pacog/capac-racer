import React from 'react';
import PropTypes from 'prop-types';

function TutorialScreen1({ onNext }) {
    return (
        <div className="tutorial-screen">
            <div
                className="tutorial-screen-image  tutorial-screen-image-1
            "
            />
            <div className="tutorial-screen-text">
                <div className="tutorial-screen-text-filler">
                    <p>You can move it by clicking in of the 9 buttons.</p>
                </div>
                <button
                    className="button tutorial-screen-button"
                    type="button"
                    onClick={onNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

TutorialScreen1.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default TutorialScreen1;
