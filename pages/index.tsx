import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import AsteroidGrid from "../components/AsteroidsGrid";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { getAsteroids } from "../helpers/asteroid";
import { ApodData } from "../types/apod";
import { AsteroidWeek } from "../types/asteroid";

type HomePageProps = ApodData & {
  asteroids: AsteroidWeek | null;
  initialDate: number;
};

const Home: NextPage<HomePageProps> = ({ apod, asteroids, initialDate }) => {
  return (
    <Layout apod={apod}>
      <Head>
        <title>Home - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      {asteroids ? (
        <AsteroidGrid initialAsteroids={asteroids} initialDate={new Date(initialDate)} />
      ) : (
        <h3>Не получилось получить астероиды :с</h3>
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
