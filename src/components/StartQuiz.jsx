import React, { Fragment } from "react";

const StartQuiz = ({handleStart}) => {
  return (
    <Fragment>
      <h2>Quizzical</h2>
      <p>Some description if needed</p>
      <button onClick={handleStart}>Start Quiz</button>
    </Fragment>
  );
};

export default StartQuiz;
