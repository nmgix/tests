import { Content } from "../components/PageComponents/User/Content";
import { Header } from "../components/PageComponents/Header";
import { useAppContext } from "../components/BasicComponents/Context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { StyledPage } from "../components/PageComponents/StyledPage";
export const UserPage: React.FC = () => {
  const context = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.authed) {
      navigate("/login");
    }
  }, [context.authed, navigate]);

  return !context.authed ? (
    <></>
  ) : (
    <StyledPage>
      <Header />
      <Content />
    </StyledPage>
  );
};
