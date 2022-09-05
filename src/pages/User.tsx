import styled from "styled-components";
import { Content } from "../components/PageComponents/User/Content";
import { Header, StyledHeader } from "../components/PageComponents/User/Header";
import { useAppContext } from "../components/BasicComponents/Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const UserPage: React.FC = () => {
  const context = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.authed) {
      navigate("/login");
    }
  }, [context.authed]);

  return !context.authed ? (
    <></>
  ) : (
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
