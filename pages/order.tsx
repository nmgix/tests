import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import AsteroidGrid from "../components/AsteroidsGrid";
import Button from "../components/Common/Button";
import { useAsteroidContext } from "../components/Common/Context";
import HeaderSecondary from "../components/Header/Secondary";
import Layout from "../components/Layout";
import { getApod } from "../helpers/apodRequests";
import { ApodData } from "../types/apod";
import { Asteroid } from "../types/asteroid";

import classes from "../styles/pages/order/order.module.scss";

type OrderPageProps = ApodData & {};

const Order: NextPage<OrderPageProps> = ({ apod }) => {
  const { order, asteroids, orderDuplicates, setLoading, confirmOrder } = useAsteroidContext();

  const renderLocalOrder = (): Asteroid[] => {
    let result = order.filter((orderAsteroid) => {
      let duplicate = orderDuplicates.current.find((asId) => asId === orderAsteroid.id);
      if (!duplicate) {
        return true;
      }
      return false;
    });

    setTimeout(() => {
      setLoading(false);
    }, 1);
    return result;
  };

  return (
    <Layout apod={apod}>
      <Head>
        <title>Order - Armaggedon V2</title>
      </Head>
      <HeaderSecondary />
      <div className={classes.orderWrapper}>
        <AsteroidGrid
          asteroids={[...renderLocalOrder(), ...asteroids.filter((as) => as.ordered === true)]}
          initialDate={new Date()}
          errorText={"Астероидов нет в заказе"}
          infiniteLoad={false}
        />
        {order.length > 0 ? (
          <Button color='#FFF' onClick={() => confirmOrder()} dontStretch>
            Отправить бригаду им. Брюса Уиллиса
          </Button>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<OrderPageProps> = async () => {
  let apod = await getApod();

  return { props: { apod } };
};

export default Order;
