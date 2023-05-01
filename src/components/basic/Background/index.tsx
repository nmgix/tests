import classnames from "./background.module.scss";

const route = process.env.NODE_ENV === "production" ? "amoCRM-front-laylout" : "";

const Background: React.FC = () => {
  return (
    <div className={classnames.wrapper}>
      <div className={classnames.pc}>
        <div className={classnames.pcRedLight} />
        <div className={classnames.pcPurpleLight} />
        <div className={classnames.pcRedBall1} />
        <div className={classnames.pcRedBall2} />
        <div className={classnames.pcPurpleBall} />
      </div>
      <div className={classnames.mobile}>
        <div className={classnames.mobilePurpleLight} />
        <div className={classnames.mobileRedLight} />
        <div className={classnames.mobileYellowLight} />
        <img className={classnames.mobileNoise} src={`${route}/png/noise.png`} alt='background' draggable={false} />
        <div className={classnames.mobileGlass} />
        <div className={classnames.mobileRedBall1} />
        <div className={classnames.mobileYellowBall1} />
        <div className={classnames.mobilePurpleBall1} />
        <div className={classnames.mobileRedBall2} />
      </div>
    </div>
  );
};

export default Background;
