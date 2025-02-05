import styled from "styled-components";
import { Device } from "../../helpers/media";
export const Description = styled.p`
  font-size: 12px;
  margin: 0;

  @media ${Device("768px")} {
    width: 100%;

    p {
      font-size: 14px;
      text-align: justify;
    }
  }
`;
