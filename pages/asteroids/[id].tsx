import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useCallback, useRef } from "react";
import HeaderSecondary from "../../components/Header/Secondary";
import Layout from "../../components/Layout";
import { getApod } from "../../helpers/apodRequests";
import { getAsteroid } from "../../helpers/asteroidRequests";
import { ApodData } from "../../types/apod";
import { AsteroidData } from "../../types/asteroid";

type AsteroidPageProps = ApodData & AsteroidData;

const Asteroid: React.FC<AsteroidPageProps> = ({ apod, asteroid }) => {
  let closestDate = useCallback((): Date => {
    console.log("called");

    let currentDate = new Date().valueOf();
    let asteroidDates = asteroid.close_approach_data.map((data) => new Date(data.close_approach_date).valueOf());

    var closestDate = asteroidDates.reduce(function (prev, curr) {
      return Math.abs(curr - currentDate) < Math.abs(prev - currentDate) ? curr : prev;
    });

    return new Date(closestDate);
  }, [asteroid]);

  return (
    <Layout apod={apod}>
      <Head>
        <title>{asteroid.name} - Armaggedon V2</title>
      </Head>
      <HeaderSecondary
        alterName={`Астероид ${asteroid.name}`}
        withDate={closestDate()}
        withIcon={<div style={{ height: "80px", aspectRatio: "1/1", border: "1px solid black" }}></div>}
        withoutHazardous
      />
      <div>Asteroid</div>
    </Layout>
  );
};

export default Asteroid;

export const getServerSideProps: GetServerSideProps<AsteroidPageProps, { id: string }> = async ({ query }) => {
  //                                                                   не даёт эффекта
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
