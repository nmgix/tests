import React from "react";
import Icon from "../../Common/Icon";
import classes from "./styles.module.scss";

type AsteroidIconProps = {
  hazardous: boolean;
};

const AsteroidIcon: React.FC<AsteroidIconProps> = ({ hazardous }) => {
  return (
    <div
      className={classes.asteroidIcon}
      style={{
        background: !hazardous
          ? "linear-gradient(90deg, #CFF37D 0%, #7DE88C 100%)"
          : "linear-gradient(90deg, #FFB199 0%, #FF0844 100%)",
      }}>
      {!hazardous ? (
        <div className={classes.asteroidIconWrapper} style={{ top: "20%", left: "20%" }}>
          <Icon icon='asteroid.svg' size='xs' />
        </div>
      ) : (
        <div className={classes.asteroidIconWrapper} style={{ top: "20%", left: "20%" }}>
          <Icon icon='asteroid.svg' size='xxxl' />
        </div>
      )}
      <div className={classes.dinosaurIconWrapper}>
        <Icon icon='dinosaur.svg' size='m' />
      </div>
    </div>
  );
};
export default AsteroidIcon;
