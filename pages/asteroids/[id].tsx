import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";
import { getApod } from "../../helpers/apodRequests";
import { getAsteroid } from "../../helpers/asteroidRequests";
import { ApodData } from "../../types/apod";
import { AsteroidData } from "../../types/asteroid";

type AsteroidPageProps = ApodData & AsteroidData;

const Asteroid: React.FC<AsteroidPageProps> = ({ apod, asteroid }) => {
  return (
    <Layout apod={apod}>
      <Head>
        <title>{asteroid.name} - Armaggedon V2</title>
      </Head>
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
