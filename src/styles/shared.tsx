import styled from "styled-components";
import { backgroundColor, accentColor } from "../styles/themes";

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
  line-height: ${(props) => (!props.type ? "2.5rem" : 0)};
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.5;
  }
`;
export const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return <StyledButton onClick={onClick}>{!type ? children : <img />}</StyledButton>;
};

export const StyledContainer = styled.div`
  border-bottom: 2px solid #efefef;
`;
