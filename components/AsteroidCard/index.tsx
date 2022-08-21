import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Metrics, MetricsShort, numberWithCommas } from "../../helpers/metrics";
import { Asteroid } from "../../types/asteroid";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import AsteroidIcon from "../CustomIcons/AsteroidIcon/AsteroidIcon";
import classes from "./styles.module.scss";

type AsteroidCardProps = Asteroid & {
  addAsteroid: (id: string) => void;
  removeAsteroid: (id: string) => void;
  selecetedMetric: keyof typeof Metrics;
};

const AsteroidCard: React.FC<AsteroidCardProps> = memo(
  ({
    close_approach_data,
    designation,
    estimated_diameter,
    id,
    is_potentially_hazardous_asteroid,
    links,
    name,
    addAsteroid,
    removeAsteroid,
    selecetedMetric,
  }) => {
    const router = useRouter();
    // const inOrder = useRef(order.find((asteroidId) => asteroidId === id) ? true : false);
    const diameter = useRef(
      Number((Math.floor(estimated_diameter.kilometers.estimated_diameter_max * 50) / 50).toFixed(5))
    );

    const [inOrder, setInOrder] = useState<boolean>(false);

    const changeAsteroidSelection = (insideOrder: boolean) => {
      setInOrder(insideOrder);
      if (insideOrder) {
        addAsteroid(id);
      } else {
        removeAsteroid(id);
      }
    };

    return (
      <div className={classes.asteroidCard}>
        <time>
          {new Date(close_approach_data[0].close_approach_date).toLocaleDateString("ru", {
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
          {inOrder ? "Удалить из списка" : "Уничтожить"}
        </Button>
      </div>
    );
  },
  (prev, next) => {
    return prev.id === next.id && prev.selecetedMetric === next.selecetedMetric;
  }
);
export default AsteroidCard;
