import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { Button } from "./Button";

interface DefaultInput {
  type: string;
  label?: string;
  active?: boolean;
}

interface TextInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    DefaultInput {
  type: "text";
  placeholder?: string;
}
interface CheckboxInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    DefaultInput {
  type: "checkbox";
  placeholder?: string;
}
interface SwitchInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    DefaultInput {
  type: "switch";
  placeholder?: string;
}
interface PasswordInput
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    DefaultInput {
  type: "password";
  placeholder?: string;
}
interface CustomTextInput
  extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "type">,
    DefaultInput {
  type: "customText";
  jsxText: () => JSX.Element;
}

type AllInputTypes = TextInput | CheckboxInput | SwitchInput | PasswordInput | CustomTextInput;

export const Input: React.FC<AllInputTypes> = (props) => {
  let renderInput = <></>;

  switch (props.type) {
    case "customText": {
      let renderJsxChildren: JSX.Element | null = props.jsxText();

      renderInput = (
        <>
          <Button asLink onClick={props.onClick}>
            {renderJsxChildren}
          </Button>
        </>
      );
      break;
    }
    case "switch": {
      renderInput = (
        <>
          <StyledSwitch disabled={props.disabled}>
            <StyledSwitchInput
              onChange={!props.disabled ? props.onChange : undefined}
              name={props.name}
              value={props.value}
              disabled={props.disabled}
            />
            <StyledSwitchSlider />
          </StyledSwitch>
        </>
      );
      break;
    }
    default: {
      renderInput = (
        <>
          {!props.label ? <></> : <label>{props.label}</label>}
          <StyledInput
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            type={props.type as (React.HTMLInputTypeAttribute | undefined) & "text"}
            active={props.active}
            disabled={props.type === ("checkbox" || "switch") && !props.active}
          />
        </>
      );
      break;
    }
  }

  return (
    <StyledInputWrapper label={props.label} type={props.type}>
      {renderInput}
    </StyledInputWrapper>
  );
};

export const StyledInputWrapper = styled.div<DefaultInput>`
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

export const InputWrapper = styled.div``;

const StyledInput = styled.input<AllInputTypes>`
  ${(props) => {
    const { type, active } = props;
    switch (type) {
      case "checkbox": {
        return {
          opacity: active ? 1 : 0.5,
          backgroundColor: Colors.background,
          borderRadius: 0,
          border: "1px solid black",
          width: "100%",
          height: "100%",
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
const StyledSwitch = styled.label<{ disabled: boolean | undefined }>`
  position: relative;
  display: inline-block;
  width: 100%;
  aspect-ratio: 2/1;
  margin-bottom: 0;
  vertical-align: middle;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  ${StyledSwitchInput}:checked + ${StyledSwitchSlider}:before {
    transform: translateX(100%);
  }
`;
