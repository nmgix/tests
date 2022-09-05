import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { useState } from "react";
type LoaderProps = {
  dotsAmount: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Loader: React.FC<LoaderProps> = ({ dotsAmount }) => {
  const [delayMiltipier] = useState<number>(randomIntFromInterval(100, 1100));

  return (
    <LoaderWrapper>
      {Array(dotsAmount)
        .fill(null)
        .map((el, i) => {
          return <LoaderDot delay={i} delayMiltipier={delayMiltipier} />;
        })}
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.ul`
  display: flex;
  width: 100%;

  margin: 50px 0;
`;

const LoaderDot = styled.li<{ delay: number; delayMiltipier: number }>`
  @keyframes Move {
    0% {
      transform: translateY(0%);
    }
    25% {
      transform: translateY(50%);
    }
    50% {
      transform: translateY(0%);
    }
    75% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  transition: all 0.5s;

  border-radius: 50%;
  background-color: ${Colors.accent};
  /* width: 50px; */
  aspect-ratio: 1/1;
  flex: 1;
  margin: 0 3%;

  animation: Move ease-in-out 2s ${(props) => props.delay * props.delayMiltipier}ms infinite none;
`;
