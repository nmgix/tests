import classNames from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  externalClassnames?: string;
};

export const Container: React.FC<ContainerProps> = (props) => {
  const { children, externalClassnames } = props;

  return <div className={classNames(externalClassnames)}>{children}</div>;
};
