import React from 'react';
import PropTypes from 'prop-types';

function TutorialScreen0({ onNext }) {
    return (
        <div className="tutorial-screen">
            <div
                className="tutorial-screen-image  tutorial-screen-image-0
            "
            />
            <div className="tutorial-screen-text">
                <div className="tutorial-screen-text-filler">
                    <p>This is your car.</p>
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

TutorialScreen0.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default TutorialScreen0;
