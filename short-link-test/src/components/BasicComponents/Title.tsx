import styled from "styled-components";
import { SqueezeText } from "./SqueezeText";

const VersionBlock = styled.span`
  position: absolute;
  top: 115%;
  left: 100%;

  opacity: 0.5;
  font-size: 12px;
  font-family: 700;
`;
const AppTitle = styled.title`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TitleInner = styled.div`
  position: relative;
  display: inline-block;

  ${SqueezeText} {
    letter-spacing: 2px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const SubTitle = styled.span`
  text-align: center;
`;

export const Title: React.FC = () => {
  return (
    <AppTitle>
      <TitleWrapper>
        <TitleInner style={{ verticalAlign: "top" }}>
          <SqueezeText squeezeMultiplier={0.6} fontSizePX={48}>
            Squeeze
          </SqueezeText>
          <VersionBlock>v1</VersionBlock>
        </TitleInner>
      </TitleWrapper>
      <SubTitle>сервис для сокращения ссылок</SubTitle>
    </AppTitle>
  );
};
