import styled from "styled-components";

type SqueezeTextProps = {
  squeezeMultiplier: number;
  fontSizePX?: number;
};

export const SqueezeText = styled.span<SqueezeTextProps>`
  display: inline-block;
  font-size: ${({ fontSizePX }) => (fontSizePX ? fontSizePX : 32)}px;
  transform: ${({ squeezeMultiplier }) => `scaleY(${squeezeMultiplier})`};
  transform-origin: 0 0;
  margin-bottom: -50%;
  vertical-align: text-top;

  font-weight: 700;
`;
