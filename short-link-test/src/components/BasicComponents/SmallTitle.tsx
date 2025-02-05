import styled from "styled-components";
import { Device } from "../../helpers/media";
export const SmallTitle = styled.h2`
  margin: 0;
  margin-top: 5px;
  font-weight: 700;
  font-size: 18px;

  @media ${Device("768px")} {
    margin-top: 10px;
    font-size: 20px;
    text-align: center;
  }
`;
