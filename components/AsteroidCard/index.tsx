import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useRef, useState } from "react";
import { closestDate } from "../../helpers/date";
import { Metrics, MetricsShort, numberWithCommas } from "../../helpers/metrics";
import { Asteroid } from "../../types/asteroid";
import Button from "../Common/Button";
import AsteroidIcon from "../CustomIcons/AsteroidIcon/AsteroidIcon";
import classes from "./styles.module.scss";

import getConfig from "next/config";

type AsteroidCardProps = Asteroid & {
  addAsteroid: (asteroid: Asteroid) => void;
  removeAsteroid: (id: string) => void;
  selecetedMetric: keyof typeof Metrics;
};

const AsteroidCard: React.FC<AsteroidCardProps> = memo(
  (asteroid) => {
    const {
      close_approach_data,
      designation,
      estimated_diameter,
      id,
      is_potentially_hazardous_asteroid,
      links,
      name,
      ordered,
      addAsteroid,
      removeAsteroid,
      selecetedMetric,
    } = asteroid;

    const { publicRuntimeConfig } = getConfig();
    const { PROD } = publicRuntimeConfig;
    const router = useRouter();

    const diameter = useRef(
      Number((Math.floor(estimated_diameter.kilometers.estimated_diameter_max * 50) / 50).toFixed(5))
    );
    const [inOrder, setInOrder] = useState<boolean>(ordered);

    const changeAsteroidSelection = (insideOrder: boolean) => {
      setInOrder(insideOrder);
      if (insideOrder) {
        addAsteroid({
          close_approach_data,
          designation,
          estimated_diameter,
          id,
          is_potentially_hazardous_asteroid,
          links,
          name,
          ordered,
        });
      } else {
        removeAsteroid(id);
      }
    };

    return (
      <>
        {PROD === "production" ? <></> : <span>{asteroid.id}</span>}
        <div className={classes.asteroidCard}>
          <time>
            {new Date(closestDate(asteroid)).toLocaleDateString("ru", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <div className={classes.asteroidInfoWrapper}>
            <Link href={`/asteroids/${id}`}>
              <a>
                <AsteroidIcon hazardous={is_potentially_hazardous_asteroid} />
              </a>
            </Link>
            <div className={classes.asteroidInfo}>
              <Button asLink onClick={() => router.push(`/asteroids/${id}`)}>
                Астероид {name}
              </Button>
              <span>Ø {diameter.current < 1 ? `${diameter.current * 1000}м` : `${diameter.current}км`}</span>
              <span>
                ↔{" "}
                {numberWithCommas(
                  Math.floor(
                    Number(
                      close_approach_data[0].miss_distance[selecetedMetric === "kiloMeters" ? "kilometers" : "lunar"]
                    )
                  )
                )}{" "}
                {MetricsShort[selecetedMetric]}
              </span>
              <span>{!is_potentially_hazardous_asteroid ? "Не опасен" : "Опасен"}</span>
            </div>
          </div>
          <Button color='#FFF' rounded onClick={() => changeAsteroidSelection(!inOrder)}>
            {inOrder ? "Удалить из заказа" : "Уничтожить"}
          </Button>
        </div>
      </>
    );
  },
  (prev, next) => {
    return prev.id === next.id && prev.selecetedMetric === next.selecetedMetric;
  }
);
export default AsteroidCard;
