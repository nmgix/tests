import styled from "styled-components";
import { StyledContainer } from "../../styles/shared";
import { backgroundColor, accentColor } from "../../styles/themes";

export const Header = styled(StyledContainer)`
  background-color: ${backgroundColor};
  width: 100%;
  min-height: 10vh;
  padding: 1.5em 2em;
  display: flex;
  justify-content: space-between;
  margin: 0;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 2.8rem;
  display: flex;
  align-items: center;
`;
