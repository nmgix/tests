import styled from "styled-components";
import { Colors } from "../../../helpers/colors";
import "./switch.css";

type StyledInputProps = {
  type: "text" | "checkbox" | "switch" | "password";
  active?: boolean;
};
type InputProps = {
  label?: string;
  placeholder?: string;
} & StyledInputProps;

export const Input: React.FC<
  InputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <StyledInputWrapper label={props.label} type={props.type}>
      {props.type === "switch" ? (
        <>
          <StyledSwitch>
            <StyledSwitchInput />
            <StyledSwitchSlider />
          </StyledSwitch>
        </>
      ) : (
        <>
          {!props.label ? <></> : <label>{props.label}</label>}
          <StyledInput
            type={props.type}
            active={props.active}
            disabled={props.type === ("checkbox" || "switch") && !props.active}
          />
        </>
      )}
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div<InputProps>`
  ${(props) => {
    const { label } = props;
    return label
      ? {
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }
      : {
          display: "block",
        };
  }}

  label {
    font-size: 14px;
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  ${(props) => {
    const { type, active } = props;
    switch (type) {
      case "checkbox": {
        return {
          opacity: active ? 1 : 0.5,
          backgroundColor: Colors.background,
          borderRadius: 0,
          border: "1px solid black",
          width: "40px",
          height: "40px",
          cursor: !active ? "auto" : "pointer",
        };
      }
      case "text":
      case "password": {
        return {
          padding: "12px",
          border: "1px solid black",
          borderRadius: "5px",
          fontSize: "16px",
          backgroundColor: Colors.background,
        };
      }
    }
  }}

  &[type="checkbox"] {
    min-width: calc(1.2em + 4px);
    min-height: calc(1.2em + 4px);

    z-index: 1;
    display: grid;
    place-content: center;

    appearance: none;
    background-color: ${Colors.background};
    margin: 0;
    font: inherit;
    color: ${Colors.accent};
    border: 2px solid ${Colors.accent};

    &::before {
      content: "";
      width: 1.2em;
      height: 1.2em;
      display: none;
      transition: 0.05s transform ease-in-out;
      box-shadow: inset 1em 1em ${Colors.accent};
      clip-path: polygon(40% 56%, 85% 3%, 100% 17%, 40% 88%, 4% 58%, 20% 40%);
    }
    &:checked::before {
      display: block;
      z-index: 1;
    }

    &:hover {
      border: 2px solid ${Colors.accent};

      &::before {
        transition: all 100ms ease-in-out;
        box-shadow: inset 1em 1em ${Colors.accent};
      }
    }

    &:focus {
      outline: 0.05em solid ${Colors.accent};
      outline-offset: max(0px, 0px);
    }
  }
`;

const StyledSwitchInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
`;

const StyledSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Colors.accent};
  transition: 0.1s ease-in-out;
  border-radius: 1000px;

  &:before {
    content: "";
    position: absolute;
    height: calc(100% - 4px);
    aspect-ratio: 1/1;
    left: 0px;
    bottom: 0px;
    background-color: ${Colors.background};
    transition: 0.4s;
    border-radius: 50%;
    border: 2px solid ${Colors.accent};
  }
`;
const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  aspect-ratio: 2/1;
  margin-bottom: 0;
  vertical-align: middle;

  ${StyledSwitchInput}:checked + ${StyledSwitchSlider}:before {
    transform: translateX(100%);
  }
`;
