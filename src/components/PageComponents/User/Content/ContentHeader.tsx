import styled from "styled-components";
import { Colors } from "../../../../helpers/colors";
import { Button } from "../../../BasicComponents/Button";
import { CustomImage } from "../../../BasicComponents/CustomImage";
import { Input, InputWrapper } from "../../../BasicComponents/Input";
import { SqueezeText } from "../../../BasicComponents/SqueezeText";

export const ContentHeader: React.FC = () => {
  return (
    <StyledContentHeader>
      <SqueezeText squeezeMultiplier={0.8} fontSizePX={22}>
        Управление сокращёнными ссылками
      </SqueezeText>
      <ControlsWrapper>
        <Controls>
          <ControlUnitWrapper>
            <ControlUnit>
              <SqueezeText squeezeMultiplier={0.8} fontSizePX={20}>
                Выделить
              </SqueezeText>
              <InputWrapper style={{ width: "40px" }}>
                <Input type={"switch"} />
              </InputWrapper>
            </ControlUnit>
            <ul style={{ display: "flex", justifyContent: "space-between" }}>
              <li>
                <Button asLink disabled>
                  Удалить
                </Button>
              </li>
              <li>
                <Button asLink disabled>
                  Отключить
                </Button>
              </li>
            </ul>
          </ControlUnitWrapper>
          <ControlUnitWrapper>
            <ControlUnit>
              <SqueezeText squeezeMultiplier={0.8} fontSizePX={20}>
                Фильтрация
              </SqueezeText>
              <InputWrapper style={{ width: "40px" }}>
                <Input type={"switch"} />
              </InputWrapper>
            </ControlUnit>
            <Button asLink>Открыть фильтры</Button>
          </ControlUnitWrapper>
        </Controls>
        <Button>
          <span>Новая ссылка</span>
          <CustomImage imageSrc='assets/icons/arrow.svg' />
        </Button>
      </ControlsWrapper>
    </StyledContentHeader>
  );
};

const StyledContentHeader = styled.div`
  display: flex;
  flex-direction: column;

  & > ${SqueezeText} {
    margin-bottom: 13px;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;

  width: 65%;
`;

const ControlUnitWrapper = styled.div`
  padding: 9px 12px;
  border: 1px solid ${Colors.accent};
  flex: 1;

  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const ControlUnit = styled.div`
  display: flex;
  margin-bottom: 3px;

  ${SqueezeText} {
    margin-right: 10px;
    margin-bottom: 0;
  }
`;
