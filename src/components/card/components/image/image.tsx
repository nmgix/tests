import { Suspense, useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

type ImageProps = {
  src: string;
  height: number;
  alt: string;
  externalClassnames: string;
  _imageTimeout?: number;
};

const Image = ({ src, alt, externalClassnames, height, _imageTimeout }: ImageProps) => {
  const [fakeLoading, setFakeLoading] = useState(_imageTimeout !== undefined);
  useEffect(() => {
    if (_imageTimeout !== undefined) {
      setTimeout(() => setFakeLoading(false), _imageTimeout);
    }
  }, []);

  return (
    <LazyLoad height={height} once unmountIfInvisible preventLoading={fakeLoading} className={externalClassnames} style={{ height }}>
      {/* // https://stackoverflow.com/a/76253300/14889638 */}
      <img loading='lazy' src={src} alt={alt} />
    </LazyLoad>
  );
};

export const ImageSuspense = (props: ImageProps & { fallback: React.ReactElement }) => (
  <Suspense fallback={props.fallback}>
    <Image {...props} />
  </Suspense>
);
