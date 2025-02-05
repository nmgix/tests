import { CenterBlock } from "../components/BasicComponents/HoverBlock";
import { Line } from "../components/BasicComponents/Line";
import { Title } from "../components/BasicComponents/Title";
import { Form, FormTitle, FormWrapper } from "../components/BasicComponents/Form";
import { Button } from "../components/BasicComponents/Button";
import { Input } from "../components/BasicComponents/Input";
import styled from "styled-components";
import { Description } from "../components/BasicComponents/Description";
import { CustomImage } from "../components/BasicComponents/CustomImage";
import { OtherLinks, StyledOtherLinks } from "../components/PageComponents/OtherLinks";
import { Device } from "../helpers/media";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { RegisterData, registerUser } from "../networkRequests";
import { useAppContext } from "../components/BasicComponents/Context";

const RegistrationPage: React.FC = () => {
  const [data, setData] = useState<RegisterData>({ username: "", password: "", passwordRepeat: "" });

  const context = useAppContext();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password, passwordRepeat } = data;

    if (password !== passwordRepeat) {
      // тут должен быть notification + error
      return;
    }

    let response = await registerUser({ username, password });
    if (!response) {
      // здесь вызов notification + error
    } else {
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
  }, [context.authed, navigate]);

  return (
    <CenterBlock>
      <Title />
      <StyledRegistration>
        <FormWrapper>
          <FormTitle>Регистрация</FormTitle>
          <Form onSubmit={onSubmit}>
            <Input label='Почта/логин' type='text' onChange={handleInput} name='username' value={data.username} />
            <Input label='Пароль' type='password' onChange={handleInput} name='password' value={data.password} />
            <Input
              label='Повтор пароля'
              type='password'
              onChange={handleInput}
              name='passwordRepeat'
              value={data.passwordRepeat}
            />
            <Button fullWidth rounded type='submit'>
              Зарегистрироваться
            </Button>
            <Link to={"/login"}>
              <Button asLink>Войти в аккаунт</Button>
            </Link>
          </Form>
        </FormWrapper>
        <Line vertical />
        <FunctionallityPreview>
          <FormTitle>Что даёт регистрация?</FormTitle>
          <Description>После регистрации вы будете перенаправлены в личный профиль</Description>
          <CustomImage imageSrc='assets/fp/pageBackend.svg' onErrorPlaceholder={<StyledErrorPlaceholder />} />
          <Description>Вы сможете создавать сокращённые ссылки, а так же следить за их трафиком</Description>
          <CustomImage imageSrc='assets/fp/link.svg' onErrorPlaceholder={<StyledErrorPlaceholder />} />
          <Description>В навигации по таблицам вам поможет пагинация</Description>
          <CustomImage imageSrc='assets/fp/paginationBackend.svg' onErrorPlaceholder={<StyledErrorPlaceholder />} />
        </FunctionallityPreview>
      </StyledRegistration>
      <Footer>
        <OtherLinks />
      </Footer>
    </CenterBlock>
  );
};

const StyledErrorPlaceholder = styled.img`
  height: 100px;

  background-color: #b8b8b8;

  border-radius: 10px;

  @media ${Device("768px")} {
    margin-right: 0px;
  }
`;

const StyledRegistration = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;

  ${Line} {
    margin: 0 30px 0 40px;
  }

  @media ${Device("768px")} {
    flex-direction: column-reverse;
  }
`;

const FunctionallityPreview = styled.div`
  display: flex;
  flex-direction: column;

  ${FormTitle} {
    margin-bottom: 10px;
  }

  ${Description} {
    font-size: 14px;
  }

  & > *:not(${FormTitle}) {
    margin: 0 15px 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0;
  ${StyledOtherLinks} {
    width: 45%;

    @media ${Device("768px")} {
      width: 60%;
    }
  }
`;

export default RegistrationPage;
