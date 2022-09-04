import { Button } from "../BasicComponents/Button";
import { Form, FormTitle, FormWrapper } from "../BasicComponents/Form";
import { Input } from "../BasicComponents/Input/Input";
import styled from "styled-components";
import { ShareBlock } from "./ShareBlock";
import { OtherLinks, StyledOtherLinks } from "./OtherLinks";
import { Device } from "../../helpers/media";

export const AuthFooter: React.FC = () => {
  return (
    <AuthFooterWrapper>
      <FormWrapper>
        <FormTitle>Авторизация</FormTitle>
        <Form>
          <Input label='Почта/логин' type='text' />
          <Input label='Пароль' type='password' />
          <Button fullWidth rounded>
            Войти
          </Button>
          <Button asLink>Регистрация</Button>
        </Form>
      </FormWrapper>
      <SocialBlock>
        <ShareBlock />
        <OtherLinks />
      </SocialBlock>
    </AuthFooterWrapper>
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
