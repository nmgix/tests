import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ContextProvider } from "../components/Common/Context";
import Layout from "../components/Layout";

import App from "next/app";
import { AppContextType } from "next/dist/shared/lib/utils";
import { Router } from "next/router";
import { ApodImage } from "../types/asteroid";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout apod={pageProps.apod}>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

MyApp.getInitialProps = async (context: AppContextType<Router>) => {
  const appProps = await App.getInitialProps(context); // Retrieves page's `getInitialProps`

  let apod: ApodImage = await (await fetch(`${process.env.APOD_URL}?api_key=${process.env.API_KEY}`)).json();

  appProps.pageProps.apod = apod;

  return {
    ...appProps,
  };
};
