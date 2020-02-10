import React from 'react';
import PropTypes from 'prop-types';

function TutorialScreen3({ onNext }) {
    return (
        <div className="tutorial-screen">
            <div className="tutorial-screen-image">Image</div>
            <div className="tutorial-screen-text">
                <div className="tutorial-screen-text-filler">
                    <p>If you go too fast, you may crash and be penalised.</p>
                </div>
                <button
                    className="button tutorial-screen-button"
                    type="button"
                    onClick={onNext}
                >
                    Done!
                </button>
            </div>
        </div>
    );
}

TutorialScreen3.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default TutorialScreen3;
