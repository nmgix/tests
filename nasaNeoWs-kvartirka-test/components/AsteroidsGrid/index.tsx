import React, { memo, useCallback, useEffect, useState } from "react";
import { addSubstractDays } from "../../helpers/date";
import { Asteroid } from "../../types/asteroid";
import AsteroidCard from "../AsteroidCard";
import Button from "../Common/Button";
import { useAsteroidContext } from "../Common/Context";
import classes from "./styles.module.scss";

import InfiniteScroll from "react-infinite-scroll-component";
import { getAsteroids } from "../../helpers/asteroid";
import getConfig from "next/config";

type AsteroidGridProps = {
  asteroids: Asteroid[] | null;
  initialDate: Date;
  errorText: string;

  infiniteLoad: boolean;
};

const AsteroidGrid: React.FC<AsteroidGridProps> = memo(({ asteroids, initialDate, errorText, infiniteLoad }) => {
  const { publicRuntimeConfig } = getConfig();
  const { nodeENV } = publicRuntimeConfig;

  const { loading, selecetedMetric, addAsteroid, removeAsteroid, showHazardous, setAsteroids } = useAsteroidContext();
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    return initialDate;
  });
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const handleAsteroids = useCallback(async () => {
    if (!infiniteLoad) {
      return;
    }

    if (loadingMore) {
      return;
    }

    setLoadingMore(true);

    let localCurrentDate = new Date(currentDate);
    localCurrentDate.setDate(localCurrentDate.getDate() - 1);

    const asteroidData = await getAsteroids(localCurrentDate);
    setAsteroids((prev) => {
      if (!asteroidData || !asteroidData.asteroids) {
        setHasMore(false);
        return prev;
      }

      if (!prev) {
        return [...asteroidData!.asteroids!];
      } else {
        return [...prev, ...asteroidData!.asteroids!];
      }
    });

    setCurrentDate(new Date(asteroidData!.date));

    setLoadingMore(false);

    window.scrollBy(0, -1);
  }, [asteroids, showHazardous]);

  useEffect(() => {
    if (
      showHazardous &&
      asteroids &&
      asteroids.filter((as) => as.is_potentially_hazardous_asteroid === true).length < 16
    ) {
      handleAsteroids();
    }
  }, [asteroids, showHazardous]);

  if (loading) {
    return <h3>Загрузка астероидов...</h3>;
  }

  return !asteroids || asteroids.length === 0 ? (
    <h3>{errorText}</h3>
  ) : infiniteLoad ? (
    <InfiniteScroll
      dataLength={asteroids.length}
      next={handleAsteroids}
      hasMore={hasMore}
      loader={<h3>Астероиды загружаются...</h3>}
      endMessage={<h3 className={classes.noMoreAsteroids}>Больше астероидов нет :с</h3>}>
      <ul className={classes.asteroidsGrid}>
        {asteroids.map((asteroid) => (
          <li
            key={asteroid.id + asteroid.name.replace(" ", "")}
            style={{
              display:
                asteroid.is_potentially_hazardous_asteroid === false && showHazardous === true ? "none" : "list-item",
            }}>
            <AsteroidCard
              {...asteroid}
              addAsteroid={addAsteroid}
              removeAsteroid={removeAsteroid}
              selecetedMetric={selecetedMetric}
              nodeENV={nodeENV}
            />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
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
            nodeENV={nodeENV}
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

AsteroidGrid.displayName = "AsteroidGrid";

export default AsteroidGrid;
