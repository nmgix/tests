import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

type ImageProps = {
  src: string;
  height: number;
  alt: string;
  fallback: React.ReactElement;
  externalClassnames?: string;
  _imageTimeout?: number;
};

export const Image = ({ src, alt, externalClassnames, height, fallback, _imageTimeout }: ImageProps) => {
  const [fakeLoading, setFakeLoading] = useState(_imageTimeout !== undefined);
  useEffect(() => {
    if (_imageTimeout !== undefined) {
      setTimeout(() => setFakeLoading(false), _imageTimeout);
    }
  }, []);

  return (
    <LazyLoad
      throttle
      height={height}
      // once
      unmountIfInvisible
      preventLoading={fakeLoading}
      className={externalClassnames}
      style={{ height }}
      placeholder={fallback}>
      {/* // https://stackoverflow.com/a/76253300/14889638 */}
      <img loading='lazy' src={src} alt={alt} />
    </LazyLoad>
  );
};

Image.displayName = "Image";
