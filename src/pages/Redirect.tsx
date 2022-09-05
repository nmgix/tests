import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledPage } from "../components/PageComponents/StyledPage";
import { Header } from "../components/PageComponents/Header";
import { SqueezeText } from "../components/BasicComponents/SqueezeText";
import { Loader } from "../components/BasicComponents/Loader";

export const RedirectPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_ADRESS}/s/${params.key}`;

    if (params === undefined) {
      navigate("/");
    } else {
      window.location.replace(url);
    }
  }, [params.key]);

  return (
    <StyledPage>
      <Header />
      <div>
        <SqueezeText squeezeMultiplier={0.9} fontSizePX={24}>
          Перенаправляем...
        </SqueezeText>
        <Loader dotsAmount={5} />
      </div>
    </StyledPage>
  );
};
