import styled from "styled-components";

export const StyledDateBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1rem 1em 7em;
  align-items: center;

  @media screen and (max-width: 550px) {
    padding: 1em 1em;
  }
`;
