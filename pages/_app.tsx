import "../styles/globals.scss";
import type { AppProps } from "next/app";
import store from "@/store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ul id='errors-wrapper' />
      <ul id='modals' />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
