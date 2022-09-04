import styled from "styled-components";
import { Colors } from "../../helpers/colors";
type ButtonProps = {
  asLink?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
};

export const Button = styled.button<ButtonProps>`
  ${(props) => {
    const { asLink, rounded, disabled } = props;
    switch (asLink) {
      case true: {
        return {
          textDecoration: disabled ? "none" : "underline",
          padding: 0,
          fontWeight: 500,
          color: Colors.accent,
        };
      }
      default: {
        return `
        text-decoration: none;
        padding: 12px;
        border-radius: ${rounded ? "10px" : 0};
        background-color: ${Colors.accent};

        &, & > * {
          color: ${Colors.background};
          font-weight: 700;
        }

        & > * {
          margin: 0 5px;
        }
        `;
      }
    }
  }}

  ${(props) => {
    if (props.disabled) {
      return `
        opacity: 0.5;
      `;
    } else {
      return `
        &:hover {
          opacity: 0.5;
        }

        &:active {
          filter: brightness(50%);
        }`;
    }
  }}

  cursor: ${(props) => (!props.disabled ? "pointer" : "auto")};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  border: none;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
`;
