import styled from "styled-components";
import { Button } from "../../../BasicComponents/Button";
import { CustomImage } from "../../../BasicComponents/CustomImage";

type PaginationProps = {
  areBefore: boolean;
  areNext: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({ areBefore, areNext }) => {
  return (
    <StyledPagination>
      <ButtonsWrapper>
        <Button onClick={() => (areBefore ? console.log("previous") : null)} disabled={!areBefore}>
          <TransparentBlock transparent={!areBefore}>
            <CustomImage imageSrc='assets/icons/arrow.svg' />
          </TransparentBlock>
        </Button>
        <Button onClick={() => (areNext ? console.log("next") : null)} disabled={!areNext}>
          <TransparentBlock transparent={!areNext}>
            <CustomImage imageSrc='assets/icons/arrow.svg' />
          </TransparentBlock>
        </Button>
      </ButtonsWrapper>
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;

  ${Button}:first-child {
    margin-right: 8px;
    transform: rotateY(180deg);
  }
`;

const TransparentBlock = styled.div<{ transparent: boolean }>`
  ${({ transparent }) => {
    return {
      visibility: transparent ? "hidden" : "visible",
    };
  }}
`;
