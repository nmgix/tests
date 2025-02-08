type ImageProps = {
  src: string;
  alt: string;
  externalClassnames: string;
};

// https://dev.to/sergiodxa/use-react-suspense-to-wait-for-an-image-to-load-17k5

export const Image = ({ src, alt, externalClassnames }: ImageProps) => {
  return <img src={src} alt={alt} className={externalClassnames} />;
};
