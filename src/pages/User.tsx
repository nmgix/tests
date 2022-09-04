import styled from "styled-components";
import { Content } from "../components/PageComponents/User/Content";
import { Header, StyledHeader } from "../components/PageComponents/User/Header";
export const UserPage: React.FC = () => {
  return (
    <StyledUserPage>
      <Header />
      <Content />
    </StyledUserPage>
  );
};

const StyledUserPage = styled.div`
  position: relative;

  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  ${StyledHeader} {
    position: absolute;

    top: 0;
    left: 0;
  }
`;
