import styled from "styled-components";
import { StyledButton } from "../../../styles/shared";
import { StyledBar } from "../shared";

export const StyledMonthYear = styled.span`
  font-size: 1.2rem;
`;
export const StyledMonthYearBar = styled(StyledBar)`
  width: calc(100%);
  margin-bottom: -0.75rem;

  ${StyledButton} {
    width: 10%;
    font-size: 2.5rem;
    font-weight: 500;
    justify-content: center;
  }
`;
