import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, InputWrapper, StyledInputWrapper } from "../../../BasicComponents/Input";
import { LinkData } from "../Content";
import { Colors } from "../../../../helpers/colors";
import { CustomImage, StyledImage } from "../../../BasicComponents/CustomImage";
import { Button } from "../../../BasicComponents/Button";

type ContentMainProps = {
  data: LinkData[];
  selectionActive: boolean;
};

const removeLinkProtocol = (link: string) => {
  const url = new URL(link);
  return `${url.host}${url.pathname}`;
};

const truncateWord = (word: string, maxLength: number) => {
  return `${word.split("").slice(0, maxLength).join("")}...`;
};

const copyToClipboard = (string: string) => {
  navigator.clipboard.writeText(string);
};

export const ContentMain: React.FC<ContentMainProps> = ({ data, selectionActive }) => {
  return (
    <StyledContentMain>
      <List>
        {data.map((linkData) => (
          <ListLinkWrapper key={linkData.shortLink}>
            {selectionActive ? (
              <InputWrapper>
                <Input type='checkbox' active />
              </InputWrapper>
            ) : (
              <></>
            )}
            <ListLink>
              <ListLinkContent>
                <a href={linkData.fullLink} target='_blank' rel='noopener noreferrer'>
                  <Button asLink>{truncateWord(removeLinkProtocol(linkData.fullLink), 17)}</Button>
                </a>
                <Button asLink onClick={() => copyToClipboard(linkData.fullLink)}>
                  <CustomImage imageSrc='assets/icons/copy.svg' />
                </Button>
              </ListLinkContent>
              <ListLinkContent>
                <Link to={`/${linkData.shortLink}`} target='_blank' rel='noopener noreferrer'>
                  <Button asLink>
                    {window.location.href}
                    {linkData.shortLink}
                  </Button>
                </Link>
                <Button asLink onClick={() => copyToClipboard(`${window.location.href}${linkData.shortLink}`)}>
                  <CustomImage imageSrc='assets/icons/copy.svg' />
                </Button>
              </ListLinkContent>
              <ListLinkContent>
                <div style={{ height: "80%" }}>
                  <CustomImage imageSrc='assets/icons/eye.svg' />
                </div>
                <LinkClicks>{linkData.clicks}</LinkClicks>
              </ListLinkContent>
            </ListLink>
          </ListLinkWrapper>
        ))}
      </List>
      <Pagination></Pagination>
    </StyledContentMain>
  );
};

const StyledContentMain = styled.div`
  margin: 20px 0;
`;

const ListLinkWrapper = styled.li`
  display: flex;
  height: 35px;

  ${InputWrapper} {
    margin-right: 15px;
    height: 100%;
    aspect-ratio: 1/1;

    ${StyledInputWrapper} {
      width: 100%;
      height: 100%;
    }
  }
`;

const List = styled.ul`
  ${ListLinkWrapper}:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const ListLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 1;

  padding: 8px 5px;

  background-color: ${Colors.shade};
`;

const ListLinkContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  a {
    color: ${Colors.accent};
  }

  ${StyledImage} {
    height: 100%;
  }

  ${Button} {
    height: 100%;
  }
`;

const LinkClicks = styled.span`
  font-weight: 700;
`;

const Pagination = styled.ul``;
