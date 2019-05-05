import React from 'react';
import PropTypes from 'prop-types';


function Result(props) {
    return (
        <div className="result">
            <strong>{props.quizResult}</strong>
      </div>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string
};

export default Result;