import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { Button, StyledPaddingContainer, StyledContainer } from "../../styles/shared";
import { Header as HeaderMain, Title } from "./styles";

const Header = () => {
  const { createEvent } = useContext(AppContext);

  return (
    <StyledContainer>
      <StyledPaddingContainer>
        <HeaderMain>
          <Title>Interview Calendar</Title>
          <Button onClick={() => createEvent()}>+</Button>
        </HeaderMain>
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Header;
