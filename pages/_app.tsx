import "../styles/globals.scss";
import type { AppProps } from "next/app";
import store from "@/store/store";
import { Provider } from "react-redux";
import { ModalList, ModalProvider } from "@/components/Modal/ModalList/ModalList";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ModalProvider>
        <ul id='errors-wrapper' />
        <ModalList />
        <Component {...pageProps} />
      </ModalProvider>
    </Provider>
  );
}

export default MyApp;
