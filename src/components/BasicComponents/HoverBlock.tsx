import styled from "styled-components";
import { Colors } from "../../helpers/colors";
import { Device } from "../../helpers/media";
export const HoverBlock = styled.div`
  background-color: ${Colors.background};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
`;

export const CenterBlock = styled(HoverBlock)`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: 30px 0;

  width: 560px;
  height: auto;
  padding: 20px 45px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;

  /* & > *:not(:first-child) {
    margin-top: 10px;
  }
  & > *:not(:last-child) {
    margin-bottom: 10px;
  } */
  & > * {
    margin: 10px;
  }

  @media ${Device("768px")} {
    width: 70%;

    top: 0;
    transform: translate(-50%, 0);
  }
`;
