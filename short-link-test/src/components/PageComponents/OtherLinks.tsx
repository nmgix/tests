import styled from "styled-components";
import { Button } from "../BasicComponents/Button";
import { SqueezeText } from "../BasicComponents/SqueezeText";

const Links = {
  api: `${process.env.REACT_APP_SERVER_ADRESS}/docs#/`,
  creators: `https://github.com/Nmgix`,
  law: "https://en.wikipedia.org/wiki/Law",
};

const Translation = {
  api: "Документация API",
  creators: "Разработчики",
  law: "Юр.информация",
};

export const OtherLinks: React.FC = () => {
  return (
    <StyledOtherLinks>
      <SqueezeText squeezeMultiplier={0.8} fontSizePX={20}>
        Прочие ссылки
      </SqueezeText>
      <LinksWrapper>
        {Object.keys(Links).map((link) => (
          <StyledLink key={link}>
            <a href={Links[link as keyof typeof Links]} target='_blank' rel='noopener noreferrer'>
              <Button asLink>{Translation[link as keyof typeof Translation]}</Button>
            </a>
          </StyledLink>
        ))}
      </LinksWrapper>
    </StyledOtherLinks>
  );
};

export const StyledOtherLinks = styled.div`
  ${SqueezeText} {
    margin-bottom: 1px;
  }

  ${Button} {
    text-decoration: none;
    opacity: 0.5;
  }
`;

const LinksWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLink = styled.li`
  margin-bottom: 6px;

  a {
    text-decoration: none;
  }
`;
