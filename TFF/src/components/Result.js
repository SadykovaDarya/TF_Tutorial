import React from 'react';
import PropTypes from 'prop-types';


function Result(props) {
    return (
        <div className="result">
            You got <strong>{props.quizResult} right</strong>!
      </div>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string
};

export default Result;