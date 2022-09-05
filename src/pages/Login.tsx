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
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthData, loginUser } from "../networkRequests";
import { useAppContext } from "../components/BasicComponents/Context";

const LoginPage: React.FC = () => {
  const [data, setData] = useState<AuthData>({ username: "", password: "" });

  const context = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await loginUser(data);
    if (!response) {
      // здесь вызов notification + error
    } else {
      // здесь ставится bearer в стейт контекста
      context.changeAuthState(true);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (context.authed) {
      navigate("/");
    }
  }, [context.authed]);

  return (
    <CenterBlock>
      <Title />
      <GreetDescription />
      <Line />
      <AuthFooterWrapper>
        <FormWrapper>
          <FormTitle>Авторизация</FormTitle>
          <Form onSubmit={onSubmit}>
            <Input label='Почта/логин' type='text' onChange={handleInput} name='username' value={data.username} />
            <Input label='Пароль' type='password' onChange={handleInput} name='password' value={data.password} />
            <Button fullWidth rounded type='submit'>
              Войти
            </Button>
            <Link to={"/registration"}>
              <Button asLink type='submit'>
                Регистрация
              </Button>
            </Link>
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
  flex: 1;

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
