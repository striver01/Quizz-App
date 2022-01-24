import React, { FC, memo } from "react";
import styled from "styled-components";
import { Answer } from "./Main";

interface Props {
  answers: string[];
  userAnswers: Answer | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Options: FC<Props> = ({ answers, userAnswers, callback }) => {
  return (
    <div>
      {answers.map((item) => (
        <Option
          correct={userAnswers?.correctAnswer === item}
          userClicked={userAnswers?.answer === item}
          disabled={userAnswers ? true : false}
          value={item}
          onClick={callback}
        >
          {item}
        </Option>
      ))}
    </div>
  );
};

export default memo(Options);

interface ButtonWrapperProps {
  correct: boolean;
  userClicked: boolean;
}

const Option = styled.button<ButtonWrapperProps>`
  cursor: pointer;
  background-color: lightblue;
  margin: 15px;
  padding: 10px 30px;
  border-radius: 20px;
  display: block;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  @media (max-width: 464px) {
    font-size: 12px;
    padding: 10px 10px;
  }
  &:hover {
    background: green;
  }
  background: ${({ correct, userClicked }) =>
    correct
      ? "green"
      : !correct && userClicked
      ? "linear-gradient(#ff5656,#c16868)"
      : "linear-gradient(#56ccff,#6eafb4)"};
`;
