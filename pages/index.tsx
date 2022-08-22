import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import AsteroidGrid from "../components/AsteroidsGrid";
import { useAsteroidContext } from "../components/Common/Context";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { getAsteroids, getMoreAsteroids, handleWeek } from "../helpers/asteroid";
import { ApodData } from "../types/apod";
import { AsteroidWeek } from "../types/asteroid";

type HomePageProps = ApodData & {
  asteroids: AsteroidWeek | null;
  // handleWeek(asteroids)
  initialDate: number;
};

const Home: NextPage<HomePageProps> = ({ apod, asteroids, initialDate }) => {
  const context = useAsteroidContext();

  useEffect(() => {
    if (asteroids) {
      let formatedAsteroids = handleWeek(asteroids);
      if (!formatedAsteroids) {
        return;
      }
      context.setAsteroids(formatedAsteroids);
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
          getMoreAsteroids={getMoreAsteroids}
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
  initialDate.setDate(initialDate.getDate() - 7);
  let asteroids = await getAsteroids(initialDate);

  res.setHeader("Cache-Control", "public, s-maxage=600");

  return { props: { apod, asteroids, initialDate: initialDate.valueOf() } };
};

export default Home;
