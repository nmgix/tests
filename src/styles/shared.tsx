import styled from "styled-components";
import { backgroundColor, accentColor, darkenBackgroundColor } from "../styles/themes";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (props: any) => void;
  type?: "cross" | "arrowLeft" | "arrowRight";
};
export const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.type ? accentColor : "transparent")};
  color: ${(props) => (!props.type ? accentColor : "transparent")};
  font-weight: ${(props) => (!props.type ? "300" : 0)};
  font-size: ${(props) => (!props.type ? "3.5rem" : 0)};
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.5;
  }
`;
export const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return <StyledButton onClick={onClick}>{!type ? children : <img alt='button icon' />}</StyledButton>;
};

export const StyledContainer = styled.div<{ darkenBackground?: boolean; invertedBorder?: boolean }>`
  ${(props) => (props.invertedBorder ? "border-top: 1px solid #efefef;" : "border-bottom: 1px solid #efefef;")}
  background-color: ${(props) => (props.darkenBackground ? darkenBackgroundColor : backgroundColor)};
  width: 100%;
  margin: 0;
`;

export const StyledPaddingContainer = styled.div`
  padding: 1.5em 2em;
  height: 100%;
`;
