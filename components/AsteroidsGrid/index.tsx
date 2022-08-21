import React, { memo, useState } from "react";
import { handleWeek } from "../../helpers/asteroid";
import { addSubstractDays, formateDate } from "../../helpers/date";
import { Asteroid, AsteroidWeek } from "../../types/asteroid";
import AsteroidCard from "../AsteroidCard";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import classes from "./styles.module.scss";

type AsteroidGridProps = {
  initialAsteroids: Asteroid[] | null;
  initialDate: Date;
  errorText: string;

  infiniteLoad: boolean;
};

const AsteroidGrid: React.FC<AsteroidGridProps> = memo(({ initialAsteroids, initialDate, errorText, infiniteLoad }) => {
  const { selecetedMetric, addAsteroid, removeAsteroid, showHazardous } = useAsteroidContext();

  const [currentDate, setCurrentDate] = useState<Date>(addSubstractDays(new Date(initialDate), -1));
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(initialAsteroids);

  async function getMoreAsteroids(d: Date) {
    if (!infiniteLoad) {
      return;
    }
    let date = formateDate(d);

    let res = await fetch(`/api/asteroids/${date}`);
    let asteroidWeek: AsteroidWeek = await res.json();
    let formatedWeek = handleWeek(asteroidWeek);

    if (formatedWeek) {
      setAsteroids((prev) => {
        if (!prev) {
          return [...formatedWeek!];
        } else {
          return [...prev, ...formatedWeek!];
        }
      });
    }

    setCurrentDate(addSubstractDays(new Date(initialDate), -7));
  }

  return !asteroids ? (
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
          <Button onClick={() => getMoreAsteroids(currentDate)}>Get more</Button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
});

export default AsteroidGrid;
