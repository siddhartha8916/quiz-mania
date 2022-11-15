import React from "react";

const QuizQuestion = ({ ques, updateAnswer }) => {
  return (
    <div className="single-question">
      <h2>{ques.question}</h2>
      {ques.options.map((opt,index) => {
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
    </div>
  );
};

export default QuizQuestion;
