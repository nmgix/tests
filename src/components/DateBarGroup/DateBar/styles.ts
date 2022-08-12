import styled from "styled-components";

export const StyledDateBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 1rem 1em 7em;
  align-items: center;

  @media screen and (max-width: 400px) {
    padding: 1em 1.4rem;
  }

  @media screen and (max-width: 350px) {
    padding: 1em 1rem;
  }
`;
