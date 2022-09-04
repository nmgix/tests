import styled from "styled-components";
import { useState } from "react";
import { ContentHeader } from "./Content/ContentHeader";
import { ContentMain } from "./Content/ContentMain";

export type LinkData = {
  fullLink: string;
  shortLink: string;
  clicks: number;
};

export const Content: React.FC = () => {
  const [selectionActive] = useState<boolean>(false);

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
      <ContentHeader />
      <ContentMain data={data} selectionActive={selectionActive} />
    </StyledContent>
  );
};

export const StyledContent = styled.div`
  width: 670px;
`;
