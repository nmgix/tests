import styled from "styled-components";
import { accentColor, backgroundColor } from "../../../../styles/themes";

export const StyledBarDayDate = styled.div<{ selected: boolean }>`
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? accentColor : "transparent")};
  color: ${(props) => (props.selected ? backgroundColor : "black")};
  padding: 0.3rem;
  font-weight: 500;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

export const StyledDay = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.3rem;
  width: 10%;
`;
export const StyledDayWeekDay = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
`;
