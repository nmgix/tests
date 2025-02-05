import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import HeaderSecondary from "../../components/Header/Secondary";
import Layout from "../../components/Layout";
import { getApod } from "../../helpers/apodRequests";
import { getAsteroid } from "../../helpers/asteroid";
import { ApodData } from "../../types/apod";
import { AsteroidData } from "../../types/asteroid";

import classes from "../../styles/pages/asteroid/asteroid.module.scss";
import { useAsteroidContext } from "../../components/Common/Context";
import { MetricsShort, numberWithCommas } from "../../helpers/metrics";
import ScrollableView from "../../components/Common/ScrollableView";
import Button from "../../components/Common/Button";
import AsteroidIcon from "../../components/CustomIcons/AsteroidIcon/AsteroidIcon";
import { closestDate } from "../../helpers/date";

enum Planets {
  "Earth" = "Земля",
}

type AsteroidPageProps = ApodData & AsteroidData;

const Asteroid: React.FC<AsteroidPageProps> = ({ apod, asteroid }) => {
  const { order, removeAsteroid, addAsteroid, selecetedMetric } = useAsteroidContext();

  const [inOrder, setInOrder] = useState<boolean>(false);

  const handleAsteroid = () => {
    if (inOrder) {
      removeAsteroid(asteroid.id);
    } else {
      addAsteroid(asteroid);
    }
  };

  const isInOrder = useCallback(() => {
    return order.find((as) => as.id === asteroid.id) !== undefined;
  }, [order]);

  useEffect(() => {
    setInOrder(isInOrder());
  }, [order, isInOrder]);

  const memoizedClosestDate = useCallback(() => closestDate(asteroid), [asteroid]);
  const diameter = useRef(
    Number((Math.floor(asteroid.estimated_diameter.kilometers.estimated_diameter_max * 50) / 50).toFixed(5))
  );

  return (
    <Layout apod={apod}>
      <Head>
        <title>{asteroid.name} - Armaggedon V2</title>
      </Head>
      <HeaderSecondary
        title={`Астероид ${asteroid.name}`}
        withDate={memoizedClosestDate()}
        withIcon={<AsteroidIcon hazardous={asteroid.is_potentially_hazardous_asteroid} />}
        withoutHazardous
      />
      <main className={classes.asteroidData}>
        <div className={classes.characteristicsWrapper}>
          <HeaderWrapper title='Характеристики астероида'>
            <ul className={classes.characteristics}>
              <li>Диаметр: {diameter.current < 1 ? `${diameter.current * 1000}м` : `${diameter.current}км`}</li>
              <li>
                Расстояние до земли:{" "}
                {numberWithCommas(
                  Math.floor(
                    Number(
                      asteroid.close_approach_data.find(
                        (as) => new Date(as.close_approach_date).valueOf() === memoizedClosestDate().valueOf()
                      )!.miss_distance[selecetedMetric === "kiloMeters" ? "kilometers" : "lunar"]
                    )
                  )
                )}{" "}
                {selecetedMetric === "kiloMeters" ? "км" : "лунных орбит"}
              </li>
              <li>Потенциально опасен: {asteroid.is_potentially_hazardous_asteroid ? "Да" : "Нет"}</li>
            </ul>
          </HeaderWrapper>
        </div>
        <div className={classes.approachesWrapper}>
          <HeaderWrapper title='Список сближений'>
            <div className={classes.approaches}>
              <ScrollableView horizontalScroll>
                <table className={classes.tableData}>
                  <thead>
                    <tr>
                      <td>Дата</td>
                      <td>Скорость</td>
                      <td>Расстояние</td>
                      <td>Орбита</td>
                    </tr>
                  </thead>
                  <tbody>
                    {asteroid.close_approach_data
                      .sort(
                        (app1, app2) =>
                          new Date(app2.close_approach_date).valueOf() - new Date(app1.close_approach_date).valueOf()
                      )
                      .map((approach, i) => (
                        <tr
                          key={
                            new Date(approach.close_approach_date).valueOf() +
                            Number(approach.relative_velocity.kilometers_per_hour)
                          }>
                          <td>
                            {new Date(approach.close_approach_date).toLocaleDateString("ru", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td>
                            {numberWithCommas(Math.floor(Number(approach.relative_velocity.kilometers_per_hour)))} км/ч
                          </td>
                          <td>
                            {numberWithCommas(
                              Math.floor(
                                Number(
                                  approach.miss_distance[selecetedMetric === "kiloMeters" ? "kilometers" : "lunar"]
                                )
                              )
                            )}{" "}
                            {MetricsShort[selecetedMetric]}
                          </td>
                          <td>{Planets[approach.orbiting_body as keyof typeof Planets]}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </ScrollableView>
            </div>
          </HeaderWrapper>
        </div>
        <div className={classes.buttonWrapper}>
          <Button color='#FFF' onClick={() => handleAsteroid()}>
            {inOrder ? "Удалить из заказа" : "Уничтожить"}
          </Button>
        </div>
      </main>
    </Layout>
  );
};

export default Asteroid;

export const getServerSideProps: GetServerSideProps<AsteroidPageProps> = async ({ query }) => {
  const { id } = query;

  let apod = await getApod();
  let asteroid = await getAsteroid(id as string);

  if (!asteroid) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return { props: { apod, asteroid } };
};
