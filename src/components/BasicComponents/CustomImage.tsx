import { useState } from "react";
import styled from "styled-components";

type ImageProps = {
  imageSrc: string;
  onErrorPlaceholder?: JSX.Element;
  rounded?: boolean;
};

export const CustomImage: React.FC<ImageProps> = (props) => {
  const [loaded, setLoaded] = useState<boolean>(true);

  return loaded ? (
    <StyledImage
      src={`${process.env.PUBLIC_URL}/${props.imageSrc}`}
      draggable={false}
      {...props}
      onError={() => setLoaded(false)}
    />
  ) : (
    <>{props.onErrorPlaceholder ? props.onErrorPlaceholder : <StyledErrorPlaceholder />}</>
  );
};

export const StyledImage = styled.img<ImageProps>`
  border-radius: ${({ rounded }) => (rounded ? "50%" : 0)};
  flex: 1 1 auto;
`;

const StyledErrorPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1/1;

  background-color: #b8b8b8;

  border-radius: 10px;
`;
