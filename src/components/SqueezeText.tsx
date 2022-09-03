import styled from "styled-components";

type SqueezeTextProps = {
  squeezeMultiplier: number;
  fontSizePX?: number;
};

export const SqueezeText = styled.span<SqueezeTextProps>`
  display: inline-block;
  -webkit-transform: ${({ squeezeMultiplier }) => `scale(${squeezeMultiplier}, 1);`};
  transform: ${({ squeezeMultiplier }) => `scale(${squeezeMultiplier}, 1);`};

  transform-origin: left center;

  font-weight: 700;
  font-size: ${({ fontSizePX }) => `${fontSizePX ? fontSizePX : 14}px`};
`;
