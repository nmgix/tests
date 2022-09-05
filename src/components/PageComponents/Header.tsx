import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { Description } from "../BasicComponents/Description";
import { FormTitle } from "../BasicComponents/Form";
import { SqueezeText } from "../BasicComponents/SqueezeText";
export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <FormTitle>
        <SqueezeText squeezeMultiplier={0.7} fontSizePX={36}>
          Squeeze.com
        </SqueezeText>
      </FormTitle>
      <Description>сервис для сокращения ссылок</Description>
    </StyledHeader>
  );
};

export const StyledHeader = styled.header`
  width: 100%;
  height: calc(100px - 50px);
  background-color: ${Colors.accent};
  padding: 25px 50px;

  ${FormTitle} {
    color: ${Colors.background};
    text-align: start;
    margin-bottom: 5px;
  }

  ${Description} {
    color: ${Colors.background};
  }
`;
