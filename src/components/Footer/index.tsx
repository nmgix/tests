import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { Button, StyledContainer, StyledPaddingContainer } from "../../styles/shared";
import { Footer as FooterMain } from "./styles";

const Footer = () => {
  const { selectedCell, setSelectedDay } = useContext(AppContext);

  return (
    <StyledContainer invertedBorder darkenBackground>
      <StyledPaddingContainer>
        <FooterMain>
          <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
          {true ? <Button>Delete</Button> : <></>}
        </FooterMain>
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Footer;
