import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useCallback, useRef } from "react";
import { MetricsShort, numberWithCommas } from "../../helpers/metrics";
import { Asteroid } from "../../types/asteroid";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import AsteroidIcon from "../CustomIcons/AsteroidIcon/AsteroidIcon";
import classes from "./styles.module.scss";

type AsteroidCardProps = Asteroid;

const AsteroidCard: React.FC<AsteroidCardProps> = memo(
  ({ close_approach_data, designation, estimated_diameter, id, is_potentially_hazardous_asteroid, links, name }) => {
    const { order, selecetedMetric } = useAsteroidContext();
    const router = useRouter();
    const inOrder = useRef(order.find((asteroidId) => asteroidId === id) ? true : false);
    const diameter = useRef(
      Number((Math.floor(estimated_diameter.kilometers.estimated_diameter_max * 50) / 50).toFixed(5))
    );

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
        <Button color='#FFF' rounded>
          {inOrder.current ? "Удалить из списка" : "Уничтожить"}
        </Button>
      </div>
    );
  },
  (prev, next) => prev.id === next.id
);
export default AsteroidCard;
