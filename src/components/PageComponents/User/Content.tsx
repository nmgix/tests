import styled from "styled-components";
import { useState } from "react";
import { ContentHeader } from "./Content/ContentHeader";
import { ContentMain } from "./Content/ContentMain";
import { Pagination } from "./Content/ContentPagination";

export type LinkData = {
  fullLink: string;
  shortLink: string;
  clicks: number;
};

export const Content: React.FC = () => {
  let selectionDisabled = true;
  const [selectionActive, setSelectionActive] = useState<boolean>(false);
  const changeSelection = () => setSelectionActive((prev) => !prev);

  const [data] = useState<LinkData[]>([
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
    { clicks: 316, fullLink: "https://docs.docker.com/engine/reference/commandline/attach/", shortLink: "GAZAQ" },
  ]);

  return (
    <StyledContent>
      <ContentHeader
        selectionActive={selectionActive}
        changeSelection={changeSelection}
        selectionDisabled={selectionDisabled}
      />
      <ContentMain data={data} selectionActive={selectionActive} />
      <Pagination areBefore={false} areNext={true} />
    </StyledContent>
  );
};

export const StyledContent = styled.div`
  width: 670px;
`;
