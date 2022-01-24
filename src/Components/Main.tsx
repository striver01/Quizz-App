import axios from "axios";
import React, { FC, memo, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import styled from "styled-components";
import Quiz from "./Quiz";
import { Difficulty, Questions, Result } from "./Api";
import { ShuffleArray } from "./Util";

interface Props {}

export interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
interface Option {
  correct_answer: string;
  question: string;
  answer: string[];
}

const Main: FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Option[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [data, setData] = useState<Questions[]>([]);
  const [end, setEnd] = useState(false);
  let Data: Questions[] = [];
  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&difficulty=${Difficulty.Easy}&type=multiple`
      )
      .then((data) => {
        let value = data.data.results;
        value.map((item: Result) => {
          const newItem: Questions = {
            ...item,
            answers: ShuffleArray([
              item.correct_answer,
              ...item.incorrect_answers,
            ]),
          };
          Data.push(newItem);
        });
      });
    setData(() => Data);
  }, []);
  const Question = () => {
    data.map((item) => {
      setQuestions((questions) => [
        ...questions,
        {
          question: item.question,
          answer: item.answers,
          correct_answer: item.correct_answer,
        },
      ]);
    });
  };
  const startQuiz = () => {
    console.log(data);
    setLoading(() => true);
    Question();
    setGameOver(() => false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(() => false);
  };
  console.log(questions);
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const current = questions[number].correct_answer === answer;
      if (current) setScore((prev) => prev + 1);
      const Answer = {
        question: questions[number].question,
        answer,
        correct: current,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, Answer]);
      console.log(answer);
    }
  };

  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (number === 9) setGameOver(true);
    else setNumber(number + 1);
  };
  const handleSubmit = () => {
    setEnd(true);
  };
  return (
    <Banner>
      <Particles
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 5,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#ffffff", "#0000ff", "#00ff00", "#ffff00", "#ff0000"],
            },
            links: {
              color: "#ffff00",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 0.1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 750,
              },
              value: 200,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
        id="tsparticles"
      />
      {!end ? (
        <>
          {gameOver || userAnswers.length === 10 ? (
            <Start onClick={startQuiz}>Start</Start>
          ) : null}
          {loading && <p>Loading Question</p>}
          {!gameOver && !loading ? (
            <Quiz
              questionNo={number + 1}
              totalQuestions={10}
              question={questions[number].question}
              answers={questions[number].answer}
              userAnswers={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
              gameOver={false}
              score={score}
            />
          ) : (
            <Welcome>
              Welcome!!!<br></br>Click To Start
            </Welcome>
          )}

          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            (number !== 9 ? (
              <NextQuestion onClick={nextQuestion}>Next Question</NextQuestion>
            ) : (
              <Submit onClick={handleSubmit}> Submit </Submit>
            ))}
        </>
      ) : (
        <End>
          <div> Great!!! </div>
          <div>You Have Scored: {score} </div>
        </End>
      )}
    </Banner>
  );
};

Main.defaultProps = {};
export default memo(Main);

const Banner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Start = styled.button`
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 40px;
`;
const NextQuestion = styled.button`
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 560px;
`;
const Submit = styled.button`
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 560px;
`;
const Welcome = styled.div`
  position: absolute;
  width: 35%;
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(black, green, black);
  font-size: 40px;
  font-weight: 600;
  border-radius: 10px;
  margin: 30px;
  color: white;
`;
const End = styled.div`
  position: absolute;
  width: 35%;
  height: 480px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(black, green, black);
  font-size: 40px;
  font-weight: 600;
  border-radius: 10px;
  margin: 30px;
  color: white;
  text-align: center;
`;
