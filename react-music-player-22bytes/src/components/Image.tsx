import { useState } from "react";
import { Icon } from "./Icon";

const Image: React.FC<{ imgSrc: string; className: string }> = ({ imgSrc, className }) => {
  const [image, setImage] = useState<boolean>(true);

  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.log(e);
    setImage(false);
  };

  return image ? (
    <img className={className} alt={""} src={imgSrc} onError={onError} />
  ) : (
    <Icon icon='fallback-cover' color='gray' size={{ width: "50px", height: "50px" }} />
  );
};

export default Image;
