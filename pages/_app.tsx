import "../styles/globals.scss";
import type { AppProps } from "next/app";
import store from "@/store/store";
import { Provider } from "react-redux";
import { ModalList, ModalProvider } from "@/components/Modal/ModalList/ModalList";
import { EnhancedStore } from "@reduxjs/toolkit";
import { useEffect } from "react";

declare global {
  interface Window {
    Cypress?: Cypress.Cypress;
    store?: EnhancedStore;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.Cypress) {
        window.store = store;
      }
    }
  }, [typeof window]);

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
