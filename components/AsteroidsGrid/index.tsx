import React, { memo, useState } from "react";
import { getMoreAsteroids } from "../../helpers/asteroid";
import { addSubstractDays } from "../../helpers/date";
import { Asteroid } from "../../types/asteroid";
import AsteroidCard from "../AsteroidCard";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import classes from "./styles.module.scss";

type AsteroidGridProps = {
  asteroids: Asteroid[] | null;
  initialDate: Date;
  errorText: string;
  getMoreAsteroids: (d: Date) => void;

  infiniteLoad: boolean;
};

const AsteroidGrid: React.FC<AsteroidGridProps> = memo(({ asteroids, initialDate, errorText, infiniteLoad }) => {
  const { loading, selecetedMetric, addAsteroid, removeAsteroid, showHazardous, setAsteroids } = useAsteroidContext();
  const [currentDate, setCurrentDate] = useState<Date>(addSubstractDays(new Date(initialDate), -1));

  const handleAsteroids = async () => {
    if (!infiniteLoad) {
      return;
    }
    let newAsteroids = await getMoreAsteroids(currentDate);

    setAsteroids((prev) => {
      if (!prev) {
        return [...newAsteroids!];
      } else {
        return [...prev, ...newAsteroids!];
      }
    });

    setCurrentDate(addSubstractDays(new Date(initialDate), -7));
  };

  if (loading) {
    return <h3>Загрузка астероидов...</h3>;
  }

  return !asteroids || asteroids.length === 0 ? (
    <h3>{errorText}</h3>
  ) : (
    <ul className={classes.asteroidsGrid}>
      {asteroids.map((asteroid) => (
        <li
          key={asteroid.id}
          style={{
            display:
              asteroid.is_potentially_hazardous_asteroid === false && showHazardous === true ? "none" : "list-item",
          }}>
          <AsteroidCard
            {...asteroid}
            addAsteroid={addAsteroid}
            removeAsteroid={removeAsteroid}
            selecetedMetric={selecetedMetric}
          />
        </li>
      ))}
      {infiniteLoad ? (
        <li>
          <Button onClick={() => handleAsteroids()}>Get more</Button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
});

export default AsteroidGrid;
