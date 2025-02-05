import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import useImagePreloader from "src/shared/lib/hooks/useImagePreload";

type ImageProps = {
  path: string;
  alt?: string;
  externalConditions?: boolean;
};

const Image: React.FC<ImageProps> = ({ path, alt, externalConditions }) => {
  const { imagesPreloaded } = useImagePreloader([path]);

  // https://stackoverflow.com/a/76253300/14889638
  return imagesPreloaded && (externalConditions ?? true) ? (
    <img loading='lazy' className='image' draggable='false' src={path} alt={alt} />
  ) : (
    <Skeleton />
  );
};

export const ImageMemo = memo(Image, (prev, next) => prev.externalConditions === next.externalConditions);
