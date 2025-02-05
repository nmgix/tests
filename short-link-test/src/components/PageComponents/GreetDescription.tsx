import styled from "styled-components";
import { Device } from "../../helpers/media";
import { CustomImage, StyledImage } from "../BasicComponents/CustomImage";
import { Description } from "../BasicComponents/Description";
import { SmallTitle } from "../BasicComponents/SmallTitle";

export const GreetDescription: React.FC = () => {
  return (
    <main>
      <StyledGreetDescriptionWrapper>
        <CustomImage imageSrc='assets/images/greetPreview.svg' onErrorPlaceholder={<StyledErrorPlaceholder />} />
        <StyledGreetDescription>
          <SmallTitle>Зачем мне это?</SmallTitle>
          <Description>
            Во время общения, иногда появлятся острая необходимость запомнить или переслать кому-то ссылку на какой-либо
            ресурс. Данный сервис решает эту проблему, позволяя сократить ссылку. В профиле можно посмотреть таблицу
            ссылок, а также количество переходов по каждой.
          </Description>
        </StyledGreetDescription>
      </StyledGreetDescriptionWrapper>
    </main>
  );
};

const StyledErrorPlaceholder = styled.img`
  width: 100%;

  background-color: #b8b8b8;

  margin-right: 20px;
  border-radius: 10px;

  @media ${Device("768px")} {
    height: 300px;
    margin-right: 0px;
  }
`;

const StyledGreetDescription = styled.div`
  width: 30%;

  ${Description} {
    margin: 5px 0 0;
  }

  @media ${Device("768px")} {
    width: 100%;
  }
`;

const StyledGreetDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${StyledImage} {
    margin-right: 20px;

    @media ${Device("768px")} {
      width: 100%;
      margin-right: 0;
    }
  }

  @media ${Device("768px")} {
    flex-direction: column;
  }
`;
