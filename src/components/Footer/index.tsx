import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { StyledContainer, StyledPaddingContainer } from "../../styles/shared";
import { MemoizedFooter } from "./styles";

const Footer = () => {
  const { selectedCell, setSelectedDay } = useContext(AppContext);

  return (
    <StyledContainer invertedBorder darkenBackground>
      <StyledPaddingContainer>
        <MemoizedFooter selectedCell={selectedCell} setSelectedDay={setSelectedDay} />
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Footer;
