import { CenterBlock } from "../components/BasicComponents/HoverBlock";
import { Line } from "../components/BasicComponents/Line";
import { GreetDescription } from "../components/PageComponents/GreetDescription";
import { Title } from "../components/BasicComponents/Title";
import { Form, FormTitle, FormWrapper } from "../components/BasicComponents/Form";
import { Input } from "../components/BasicComponents/Input";
import { Button } from "../components/BasicComponents/Button";
import { ShareBlock } from "../components/PageComponents/ShareBlock";
import { OtherLinks, StyledOtherLinks } from "../components/PageComponents/OtherLinks";
import { Device } from "../helpers/media";
import styled from "styled-components";

const LoginPage: React.FC = () => {
  return (
    <CenterBlock>
      <Title />
      <GreetDescription />
      <Line />
      <AuthFooterWrapper>
        <FormWrapper>
          <FormTitle>Авторизация</FormTitle>
          <Form>
            <Input label='Почта/логин' type='text' />
            <Input label='Пароль' type='password' />
            <Button fullWidth rounded>
              Войти
            </Button>
            <Button asLink type='submit'>
              Регистрация
            </Button>
          </Form>
        </FormWrapper>
        <SocialBlock>
          <ShareBlock />
          <OtherLinks />
        </SocialBlock>
      </AuthFooterWrapper>
    </CenterBlock>
  );
};

const AuthFooterWrapper = styled.footer`
  display: flex;
  align-items: stretch;
  width: 100%;

  ${FormWrapper} {
    margin: 0 32px;
  }

  @media ${Device("768px")} {
    flex-direction: column;
    align-items: center;

    & > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${StyledOtherLinks} {
    width: 90%;
  }

  @media ${Device("768px")} {
    & > *:not(:last-child) {
      margin-bottom: 20px;
    }

    ${StyledOtherLinks} {
      width: 100%;
    }
  }
`;

export default LoginPage;
