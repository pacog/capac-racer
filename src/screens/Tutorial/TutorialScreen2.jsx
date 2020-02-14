import React from 'react';
import PropTypes from 'prop-types';

function TutorialScreen2({ onNext }) {
    return (
        <div className="tutorial-screen">
            <div
                className="tutorial-screen-image  tutorial-screen-image-2
            "
            />
            <div className="tutorial-screen-text">
                <div className="tutorial-screen-text-filler">
                    <p>
                        Your next move will depend on your previous move, so be
                        careful!
                    </p>
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

TutorialScreen2.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default TutorialScreen2;
