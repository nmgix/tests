import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import AsteroidGrid from "../components/AsteroidsGrid";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { getAsteroids } from "../helpers/asteroidRequests";
import { ApodData } from "../types/apod";
import { AsteroidWeek } from "../types/asteroid";

type HomePageProps = ApodData & {
  asteroids: AsteroidWeek | null;
};

const Home: NextPage<HomePageProps> = ({ apod, asteroids }) => {
  return (
    <Layout apod={apod}>
      <Head>
        <title>Home - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      {asteroids ? <AsteroidGrid asteroids={asteroids} /> : <h3>Не получилось получить астероиды :с</h3>}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req, res }) => {
  let apod = await getApod();
  let asteroids = await getAsteroids();

  res.setHeader("Cache-Control", "public, s-maxage=600");

  return { props: { apod, asteroids } };
};

export default Home;
