import { Link } from "react-router-dom";
import styled from "styled-components";
import { Input, InputWrapper, StyledInputWrapper } from "../../../BasicComponents/Input";
import { LinkData } from "../Content";
import { Colors } from "../../../../helpers/colors";
import { CustomImage, StyledImage } from "../../../BasicComponents/CustomImage";
import { Button } from "../../../BasicComponents/Button";
import { Loader } from "../../../BasicComponents/Loader";
import { useAppContext } from "../../../BasicComponents/Context";

type ContentMainProps = {
  data: LinkData[] | null;
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
  const context = useAppContext();

  let backupComponent: JSX.Element | null = null;

  if (data === null) {
    backupComponent = (
      <BackupWrapper>
        <BackupContent widthPercent={10}>
          <Loader dotsAmount={3} />
        </BackupContent>
      </BackupWrapper>
    );
  }

  if (data && data?.length === 0) {
    backupComponent = (
      <BackupWrapper>
        <BackupContent widthPercent={50}>
          <span>Нет созданных ссылок для показа</span>
          <Button onClick={() => context.setModalType("new-link")}>Создать ссылку</Button>
        </BackupContent>
      </BackupWrapper>
    );
  }

  return (
    <StyledContentMain>
      <List>
        {backupComponent !== null
          ? backupComponent
          : Array(Number(process.env.REACT_APP_LINKS_PER_LIST!))
              .fill(null)
              .map((el, i) => {
                let element = data!.at(i);

                return (
                  <ListLinkWrapper key={element ? element.short : i}>
                    {selectionActive ? (
                      <InputWrapper>
                        <Input type='checkbox' active />
                      </InputWrapper>
                    ) : (
                      <></>
                    )}
                    {!element ? (
                      <></>
                    ) : (
                      <ListLink>
                        <ListLinkContent style={{ width: "30%" }}>
                          <a href={element.target} target='_blank' rel='noopener noreferrer'>
                            <Button asLink>{truncateWord(removeLinkProtocol(element.target), 17)}</Button>
                          </a>
                          <Button asLink onClick={() => copyToClipboard(element!.target)}>
                            <CustomImage imageSrc='assets/icons/copy.svg' />
                          </Button>
                        </ListLinkContent>
                        <ListLinkContent style={{ width: "30%" }}>
                          <Link to={`/${element.short}`} target='_blank' rel='noopener noreferrer'>
                            <Button asLink>
                              {window.location.href}
                              {element.short}
                            </Button>
                          </Link>
                          <Button asLink onClick={() => copyToClipboard(`${window.location.href}${element!.short}`)}>
                            <CustomImage imageSrc='assets/icons/copy.svg' />
                          </Button>
                        </ListLinkContent>
                        <ListLinkContent style={{ width: "7%" }}>
                          <div style={{ height: "80%" }}>
                            <CustomImage imageSrc='assets/icons/eye.svg' />
                          </div>
                          <LinkClicks>{element.counter}</LinkClicks>
                        </ListLinkContent>
                      </ListLink>
                    )}
                  </ListLinkWrapper>
                );
              })}
      </List>
    </StyledContentMain>
  );
};

const BackupWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BackupContent = styled.div<{ widthPercent: number }>`
  width: ${(props) => props.widthPercent}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > *:not(:first-child) {
    margin-top: 5px;
  }
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`;

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
  display: flex;
  flex-direction: column;
  align-items: stretch;

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
