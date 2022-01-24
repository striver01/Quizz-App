import { FC, memo } from "react";
import styled from "styled-components";
import { Answer } from "./Main";
import Options from "./Options";

interface Props {
  userAnswers: Answer | undefined;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  question: string;
  questionNo: number;
  totalQuestions: number;
  score: number;
  gameOver: boolean;
}

const Quiz: FC<Props> = ({
  userAnswers,
  answers,
  callback,
  question,
  totalQuestions,
  questionNo,
  score,
  gameOver,
}) => {
  return (
    <Card>
      <h1>Quiz App</h1>
      <h3>
        Questions {questionNo}/{totalQuestions}
      </h3>
      <h4>{question}</h4>
      <Options
        answers={answers}
        callback={callback}
        userAnswers={userAnswers}
      />
      <h3>Score: {score}</h3>
    </Card>
  );
};
Quiz.defaultProps = {};
export default memo(Quiz);

const Card = styled.div`
  position: absolute;
  background-color: white;
  width: 35%;
  height: 480px;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 40px;
    text-decoration: underline;
    line-height: 10px;
  }
  h3 {
    text-align: center;
  }
  h4 {
    padding-left: 20px;
    text-align: center;
  }
  @media (max-width: 764px) {
    width: 50%;
    h1 {
      font-size: 25px;
    }
    h3 {
      font-size: 15px;
    }
  }
`;
