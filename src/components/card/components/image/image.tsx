import { Suspense, useEffect, useRef } from "react";
import { loadImage } from "./helpers";

type ImageProps = {
  src: string;
  alt: string;
  externalClassnames: string;
  _imageTimeout?: number;
};

const Image = ({ src, alt, externalClassnames, _imageTimeout }: ImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  // https://dev.to/sergiodxa/use-react-suspense-to-wait-for-an-image-to-load-17k5
  useEffect(() => {
    loadImage(src, imgRef.current, _imageTimeout).read();
  }, []);
  // https://stackoverflow.com/a/76253300/14889638
  return <img ref={imgRef} loading='lazy' alt={alt} className={externalClassnames} />;
};

export const ImageSuspense = (props: ImageProps & { fallback: React.ReactElement }) => (
  <Suspense fallback={props.fallback}>
    <Image {...props} />
  </Suspense>
);
