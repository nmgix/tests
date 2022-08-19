import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { ApodData } from "../types/apod";

type OrderPageProps = ApodData & {};

const Order: NextPage<OrderPageProps> = ({ apod }) => {
  return (
    <Layout apod={apod}>
      <Head>
        <title>Order - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      <span>Order page</span>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async ({ req, res }) => {
  let apod = await getApod();

  return { props: { apod } };
};

export default Order;
