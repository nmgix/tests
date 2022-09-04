import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { Description } from "../BasicComponents/Description";
import { SmallTitle } from "../BasicComponents/SmallTitle";
import { CustomImage, StyledImage } from "../BasicComponents/CustomImage";
import { Device } from "../../helpers/media";

const StyledShareBlock = styled.div`
  border-radius: 10px;
  border: 1px solid ${Colors.accent};
  padding: 15px 20px;
`;

const Socials = {
  twitter: "assets/social/twitter.svg",
  facebook: "assets/social/facebook.svg",
  telegram: "assets/social/telegram.svg",
  vk: "assets/social/vk.svg",
};

const SocicalLinks = {
  twitter: "https://twitter.com/",
  facebook: "https://facebook.com/",
  telegram: "https://t.me/acc_for_job",
  vk: "https://vk.com/danyanepali",
};

export const ShareBlock = () => {
  return (
    <StyledShareBlock>
      <SmallTitle>Поделись сервисом!</SmallTitle>
      <Description>Возможно этот сервис окажется кому-то полезен</Description>
      <SocialList>
        {Object.keys(Socials).map((key) => (
          <SocialLink key={key}>
            <a href={SocicalLinks[key as keyof typeof SocicalLinks]}>
              <CustomImage imageSrc={Socials[key as keyof typeof Socials]} rounded />
            </a>
          </SocialLink>
        ))}
      </SocialList>
    </StyledShareBlock>
  );
};

const SocialLink = styled.li`
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const SocialList = styled.ul`
  margin-top: 15px;

  display: flex;
  justify-content: space-between;

  ${SocialLink} {
    width: 17%;

    @media ${Device("768px")} {
      width: 12%;
    }

    @media ${Device("524px")} {
      width: 15%;
    }

    @media ${Device("425px")} {
      width: 20%;
    }

    ${StyledImage} {
      width: 100%;
    }
  }
`;
