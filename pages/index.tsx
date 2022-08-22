import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import AsteroidGrid from "../components/AsteroidsGrid";
import { useAsteroidContext } from "../components/Common/Context";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { getNasaAsteroids, handleWeek } from "../helpers/asteroid";
import { ApodData } from "../types/apod";
import { Asteroid } from "../types/asteroid";

type HomePageProps = ApodData & {
  asteroids: Asteroid[] | null;
  initialDate: number;
};

const Home: NextPage<HomePageProps> = ({ apod, asteroids, initialDate }) => {
  const context = useAsteroidContext();

  useEffect(() => {
    if (asteroids) {
      context.setAsteroids(asteroids);
      context.setLoading(false);
    }
  }, [asteroids]);

  return (
    <Layout apod={apod}>
      <Head>
        <title>Home - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      {context.asteroids ? (
        <AsteroidGrid
          asteroids={context.asteroids}
          initialDate={new Date(initialDate)}
          errorText={"Не удалось загрузить астероиды :("}
          infiniteLoad={true}
        />
      ) : (
        <h3>Не удалось получить астероиды :с</h3>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req, res }) => {
  let apod = await getApod();
  let initialDate = new Date();

  let nasaAsteroids = await getNasaAsteroids(initialDate, Number(process.env.DAYS_PER_REQUEST));
  let resultAsteroids = handleWeek(nasaAsteroids!.asteroidWeek);

  res.setHeader("Cache-Control", "public, s-maxage=600");
  return { props: { apod, asteroids: resultAsteroids, initialDate: nasaAsteroids!.date.valueOf() } };
};

export default Home;
