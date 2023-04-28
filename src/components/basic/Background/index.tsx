import classnames from "./background.module.scss";

const Background: React.FC = () => {
  return (
    <div className={classnames.wrapper}>
      <div className={classnames.redLight} />
      <div className={classnames.purpleLight} />
      <div className={classnames.redBall1} />
      <div className={classnames.redBall2} />
      <div className={classnames.purpleBall} />
    </div>
  );
};

export default Background;
