import styled from "styled-components";
import { useState } from "react";
import { ContentHeader } from "./Content/ContentHeader";
import { ContentMain } from "./Content/ContentMain";
import { Pagination } from "./Content/ContentPagination";
import { useAppContext } from "../../BasicComponents/Context";

export type LinkData = {
  id: number;
  short: string;
  target: string;
  counter: number;
};

export const Content: React.FC = () => {
  const context = useAppContext();

  let selectionDisabled = true;

  // этот код можно было положить в стейт, но это отсебятина реализации которой нет на сервере
  const [selectionActive, setSelectionActive] = useState<boolean>(false);
  // const [selected, setSelected] = useState<number[]>([]);
  // этот код можно было положить в стейт, но это отсебятина реализации которой нет на сервере

  const changeSelection = () => setSelectionActive((prev) => !prev);

  return (
    <StyledContent>
      <ContentHeader
        selectionActive={selectionActive}
        changeSelection={changeSelection}
        selectionDisabled={selectionDisabled}
      />
      <ContentMain data={context.linkList} selectionActive={selectionActive} />
      <Pagination
        areBefore={context.loading ? false : context.linkListStateData.offset > 0}
        areNext={
          context.loading
            ? false
            : context.linkList
            ? context.linkList.length === Number(process.env.REACT_APP_LINKS_PER_LIST!) + 1
            : false
        }
        onBefore={() =>
          context.setLinkListStateData((prev) => {
            return { ...prev, offset: prev.offset - (Number(process.env.REACT_APP_LINKS_PER_LIST!) + 1) };
          })
        }
        onNext={() =>
          context.setLinkListStateData((prev) => {
            return { ...prev, offset: prev.offset + (Number(process.env.REACT_APP_LINKS_PER_LIST!) + 1) };
          })
        }
      />
    </StyledContent>
  );
};

export const StyledContent = styled.div`
  width: 670px;

  margin: 30px;
`;
