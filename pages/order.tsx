import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import AsteroidGrid from "../components/AsteroidsGrid";
import { useAsteroidContext } from "../components/Common/Context";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { getOrderAsteroids } from "../helpers/asteroid";
import { ApodData } from "../types/apod";
import { Asteroid } from "../types/asteroid";

type OrderPageProps = ApodData & {};

const Order: NextPage<OrderPageProps> = ({ apod }) => {
  const { order } = useAsteroidContext();

  const [orderList, setOrderList] = useState<Asteroid[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (order.length > 0) {
        let list = await getOrderAsteroids(order);

        setLoading(false);
        setOrderList(list);
      } else {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout apod={apod}>
      <Head>
        <title>Order - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      {loading ? (
        <h3>Заказ загружается</h3>
      ) : (
        <div>
          <AsteroidGrid
            initialAsteroids={orderList}
            initialDate={new Date()}
            errorText={"Астероидов нет в заказе"}
            infiniteLoad={false}
          />
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async ({ req, res }) => {
  let apod = await getApod();

  return { props: { apod } };
};

export default Order;
