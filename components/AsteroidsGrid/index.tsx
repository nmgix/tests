import React from "react";
import { Asteroid, AsteroidWeek } from "../../types/asteroid";
import AsteroidCard from "../AsteroidCard";
import classes from "./styles.module.scss";

type AsteroidGridProps = {
  asteroids: AsteroidWeek;
};

const AsteroidGrid: React.FC<AsteroidGridProps> = ({ asteroids }) => {
  return (
    <ul className={classes.asteroidsGrid}>
      {Object.keys(asteroids.near_earth_objects).map((date) => {
        return asteroids.near_earth_objects[date].map((asteroid) => (
          <li key={asteroid.id}>
            <AsteroidCard {...asteroid} />
          </li>
        ));
      })}
    </ul>
  );
};

export default AsteroidGrid;
