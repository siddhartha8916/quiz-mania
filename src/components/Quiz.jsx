import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {
  let max_score = 5;

  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5");
      const data = await res.json();
      setQuestions(handleQuestions(data.results));
    };

    getQuestions();
    return () => {
      setQuestions([]);
    };
  }, []);

  const handleQuestions = (questions) => {
    let updatedQuestions = [];

    questions.map((ques) => {
      updatedQuestions.push({
        ...ques,
        id: nanoid(),
        options: shuffle([...ques.incorrect_answers, ques.correct_answer]),
        answer: null,
      });
    });
    return updatedQuestions;
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const updateAnswer = (questionId, answer) => {
    setQuestions(
      questions.map((ques) => {
        return ques.id === questionId ? { ...ques, answer: answer } : ques;
      })
    );
  };

  const checkAnswers = () => {
    let sc = 0;
    const allAnswered = questions.every((ques) => ques.answer);
    if (allAnswered) {
      questions.forEach((ques) => {
        if (ques.answer === ques.correct_answer) {
          sc = sc + 1;
        }
      });
      setScore(sc);
      setIsCompleted(true);
    } else {
      console.log("Fill all the questions");
    }
  };

  return (
    <div className="quiz">
      <div className="quiz-questions">
        {questions.map((ques) => {
          return (
            <QuizQuestion
              ques={ques}
              key={ques.id}
              updateAnswer={updateAnswer}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
      {isCompleted && (
        <h4>
          You scored {score}/{max_score} correct answers
        </h4>
      )}
      {questions.length > 0 && (
        <button className="check-ans-btn" onClick={checkAnswers}>
          Check Answers
        </button>
      )}
    </div>
  );
};

export default Quiz;
