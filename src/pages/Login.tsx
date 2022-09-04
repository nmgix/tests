import { CenterBlock } from "../components/BasicComponents/HoverBlock";
import { Line } from "../components/BasicComponents/Line";
import { AuthFooter } from "../components/PageComponents/AuthFooter";
import { GreetDescription } from "../components/PageComponents/GreetDescription";
import { Title } from "../components/BasicComponents/Title";

const LoginPage: React.FC = () => {
  return (
    <CenterBlock>
      <Title />
      <GreetDescription />
      <Line />
      <AuthFooter />
    </CenterBlock>
  );
};

export default LoginPage;
