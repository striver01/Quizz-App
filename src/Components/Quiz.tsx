import { FC, memo } from "react";
import styled from "styled-components";
import Particles from "react-tsparticles";
import Options from "./Options";

interface Props {}

const Quiz: FC<Props> = (props) => {
  return (
    <Card>
      <h1>Quiz App</h1>
      <h3>Questions 1/10</h3>
      <h4>Whats The Question?</h4>
      <Options />
    </Card>
  );
};
Quiz.defaultProps = {};
export default memo(Quiz);

const Card = styled.div`
  position: absolute;
  background-color: white;
  width: 500px;
  height: 500px;
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
  }
`;
