import { FC, memo } from "react";
import Particles from "react-tsparticles";
import styled from "styled-components";
import Quiz from "./Quiz";

interface Props {}

const Main: FC<Props> = (props) => {
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
      <Quiz />
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
