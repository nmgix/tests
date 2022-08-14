import React from "react";
import { Button, StyledPaddingContainer, StyledContainer } from "../../styles/shared";
import { Header as HeaderMain, Title } from "./styles";

const Header = () => {
  return (
    <StyledContainer>
      <StyledPaddingContainer>
        <HeaderMain>
          <Title>Interview Calendar</Title>
          <Button>+</Button>
        </HeaderMain>
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Header;
