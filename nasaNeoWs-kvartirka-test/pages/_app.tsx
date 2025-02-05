import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ContextProvider } from "../components/Common/Context";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
      <Footer />
    </ContextProvider>
  );
}
