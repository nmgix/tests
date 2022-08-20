import React, { useState } from "react";
import { handleWeek } from "../../helpers/asteroid";
import { addSubstractDays, formateDate } from "../../helpers/date";
import { Asteroid, AsteroidWeek } from "../../types/asteroid";
import AsteroidCard from "../AsteroidCard";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import classes from "./styles.module.scss";

type AsteroidGridProps = {
  initialAsteroids: AsteroidWeek;
  initialDate: Date;
};

const AsteroidGrid: React.FC<AsteroidGridProps> = ({ initialAsteroids, initialDate }) => {
  const { showHazardous } = useAsteroidContext();

  const [currentDate, setCurrentDate] = useState<Date>(addSubstractDays(new Date(initialDate), -1));
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(handleWeek(initialAsteroids));

  async function getMoreAsteroids(d: Date) {
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
    <h3>Не удалось загрузить астероиды :с</h3>
  ) : (
    <ul className={classes.asteroidsGrid}>
      {asteroids.map((asteroid) => (
        <li
          key={asteroid.id}
          style={{
            display:
              asteroid.is_potentially_hazardous_asteroid === false && showHazardous === true ? "none" : "list-item",
          }}>
          <AsteroidCard {...asteroid} />
        </li>
      ))}
      <li>
        <Button onClick={() => getMoreAsteroids(currentDate)}>Get more</Button>
      </li>
    </ul>
  );
};

export default AsteroidGrid;
