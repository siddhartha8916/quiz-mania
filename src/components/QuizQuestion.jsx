import React from "react";

const QuizQuestion = ({ ques, updateAnswer, isCompleted }) => {
  return (
    <div className="single-question">
      <h2>{ques.question}</h2>
      {!isCompleted && ques.options.map((opt,index) => {
        return (
          <span
            className={ques.answer === opt ? "checked" : ""}
            key={index+1}
            onClick={() => {
              updateAnswer(ques.id, opt);
            }}
          >
            {opt}
          </span>
        );
      })}
      {isCompleted && ques.options.map((opt,index) => {
        return (
          <span
            className={ques.correct_answer === opt ? "green" : ques.answer === opt ? 'red' : ''}
            key={index+1}>
            {opt}
          </span>
        );
      })}
    </div>
  );
};

export default QuizQuestion;
