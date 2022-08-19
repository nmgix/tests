import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { ApodData } from "../types/apod";

type HomePageProps = ApodData & {};

const Home: NextPage<HomePageProps> = ({ apod }) => {
  return (
    <Layout apod={apod}>
      <Head>
        <title>Home - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      <span>Home page</span>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req, res }) => {
  let apod = await getApod();

  res.setHeader("Cache-Control", "public, s-maxage=600");

  return { props: { apod } };
};

export default Home;
