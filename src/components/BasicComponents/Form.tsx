import styled from "styled-components";
import { Button } from "./Button";

export const FormTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin: 0;
  text-align: center;
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
  ${Button}[type=submit] {
    margin-top: 5px;
  }
`;

export const FormWrapper = styled(Form)``;
