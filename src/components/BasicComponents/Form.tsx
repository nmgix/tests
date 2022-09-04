import styled from "styled-components";
import { Button } from "./Button";

export const FormTitle = styled.h3`
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  ${FormTitle} {
    margin-bottom: 5px;
  }
  ${Button} {
    margin-top: 5px;
  }
`;

export const FormWrapper = styled(Form)``;
