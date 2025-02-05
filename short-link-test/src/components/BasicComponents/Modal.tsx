import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { useAppContext } from "./Context";
import { SqueezeText } from "./SqueezeText";
import { Input, StyledInputWrapper } from "./Input";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { generateLink } from "../../networkRequests";

type ModalProps = {
  widthPersentage: number;
  heightPersentage?: number;
};

export const ModalWrapper: React.FC = () => {
  const context = useAppContext();

  let currentPreset = useRef<JSX.Element>(<></>);

  useEffect(() => {
    switch (context.modalType) {
      case "filters": {
        currentPreset.current = <PresetModalFilter />;

        break;
      }
      case "new-link": {
        currentPreset.current = <PresetModalNewForm />;
      }
    }
  }, [context.modalType, context.modalActive]);

  return (
    <StyledModalWrapper $display={context.modalActive}>
      <ModalContainer>
        <ModalBackground onClick={() => context.setModalState(false)} />
        {context.modalActive ? <StyledModal widthPersentage={50}>{currentPreset.current}</StyledModal> : <></>}
      </ModalContainer>
    </StyledModalWrapper>
  );
};

const StyledModalWrapper = styled.div<{ $display: boolean }>`
  width: 100%;
  height: 100%;

  z-index: 99;

  display: ${(props) => (props.$display ? "block" : "none")};

  position: absolute;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  cursor: pointer;
  z-index: 99;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div<ModalProps>`
  width: ${(props) => props.widthPersentage}%;
  height: ${(props) => (props.heightPersentage ? `${props.heightPersentage}%` : "auto")};

  background-color: ${Colors.background};
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);

  padding: 30px 35px;

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 100;

  & > *:not(:first-child) {
    margin-top: 5px;
  }
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  ${SqueezeText} {
    margin-bottom: -1%;
  }

  ${StyledInputWrapper} {
    align-items: stretch;
    margin-bottom: 10px;
  }
`;

const PresetModalNewForm: React.FC = () => {
  const context = useAppContext();

  const [error, setError] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  const onSubmit = () => {
    generateLink(link).then((link) => {
      if (link) {
        setError(false);
        context.pushLinks([link]);
        context.setModalState(false);
      } else {
        setError(true);
      }
    });
  };

  useEffect(() => {
    setError(false);
  }, [link]);

  return (
    <>
      <SqueezeText squeezeMultiplier={0.8} fontSizePX={24}>
        Новая ссылка
      </SqueezeText>
      <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
        <Input
          type={"text"}
          label={"Ссылка"}
          style={{ marginBottom: "10px" }}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          autoFocus
        />
        <Button onClick={onSubmit} style={{ backgroundColor: error ? Colors.red : Colors.accent }}>
          Создать ссылку
        </Button>
      </div>
    </>
  );
};

const PresetModalFilter: React.FC = () => {
  const context = useAppContext();

  const renderFilterText = (value: boolean | null): JSX.Element => {
    switch (value) {
      case true: {
        return <span style={{ color: Colors.green }}>по возр</span>;
      }
      case null: {
        return <span style={{ color: Colors.gray }}>выкл</span>;
      }
      case false: {
        return <span style={{ color: Colors.red }}>по убыв</span>;
      }
    }
  };

  return (
    <>
      <SqueezeText squeezeMultiplier={0.8} fontSizePX={24}>
        Фильтры
      </SqueezeText>
      <FilterModalUl>
        <FilterModalLi>
          <span>Основная ссылка</span>
          <Input
            type={"customText"}
            jsxText={() => renderFilterText(context.filterData["target"])}
            onClick={() =>
              context.setFilterData(
                "target",
                context.filterData["target"] === null ? true : context.filterData["target"] === true ? false : null
              )
            }
          />
        </FilterModalLi>
        <FilterModalLi>
          <span>Сокращеная ссылка</span>
          <Input
            type={"customText"}
            jsxText={() => renderFilterText(context.filterData["short"])}
            onClick={() =>
              context.setFilterData(
                "short",
                context.filterData["short"] === null ? true : context.filterData["short"] === true ? false : null
              )
            }
          />
        </FilterModalLi>
        <FilterModalLi>
          <span>Просмотры</span>
          <Input
            type={"customText"}
            jsxText={() => renderFilterText(context.filterData["counter"])}
            onClick={() =>
              context.setFilterData(
                "counter",
                context.filterData["counter"] === null ? true : context.filterData["counter"] === true ? false : null
              )
            }
          />
        </FilterModalLi>
      </FilterModalUl>
    </>
  );
};

const FilterModalUl = styled.ul`
  width: 80%;
`;

const FilterModalLi = styled.li`
  display: flex;
  justify-content: space-between;

  /* StyledInputWrapper */
  ${Button} {
    text-decoration: none;
    font-weight: 700;
  }
`;
