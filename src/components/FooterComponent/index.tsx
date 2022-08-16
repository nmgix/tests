import { useContext } from "react";
import { AppContext } from "../../context/Context";
import { StyledContainer, StyledPaddingContainer } from "../../styles/shared";
import { MemoizedFooter } from "./styles";

const Footer = () => {
  const { selectedCell, setSelectedDay, deleteScheduled } = useContext(AppContext);

  return (
    <StyledContainer invertedBorder darkenBackground>
      <StyledPaddingContainer>
        <MemoizedFooter selectedCell={selectedCell} setSelectedDay={setSelectedDay} deleteScheduled={deleteScheduled} />
      </StyledPaddingContainer>
    </StyledContainer>
  );
};

export default Footer;
