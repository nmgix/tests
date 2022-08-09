import { createGlobalStyle } from "styled-components";

import GilroyBlackWoff from "../fonts/Gilroy-Black.woff";
import GilroyBlackWoff2 from "../fonts/Gilroy-Black.woff2";

import GilroyBoldWoff from "../fonts/Gilroy-Bold.woff";
import GilroyBoldWoff2 from "../fonts/Gilroy-Bold.woff2";

import GilroyHeavyWoff from "../fonts/Gilroy-Heavy.woff";
import GilroyHeavyWoff2 from "../fonts/Gilroy-Heavy.woff2";

import GilroyLightWoff from "../fonts/Gilroy-Light.woff";
import GilroyLightWoff2 from "../fonts/Gilroy-Light.woff2";

import GilroyMediumWoff from "../fonts/Gilroy-Medium.woff";
import GilroyMediumWoff2 from "../fonts/Gilroy-Medium.woff2";

import GilroyRegularWoff from "../fonts/Gilroy-Regular.woff";
import GilroyRegularWoff2 from "../fonts/Gilroy-Regular.woff2";

import GilroyThinWoff from "../fonts/Gilroy-Thin.woff";
import GilroyThinWoff2 from "../fonts/Gilroy-Thin.woff2";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Gilroy', sans-serif; 
        transition: all 0.1s ease-in-out;
        font-size: 16px;
    }
    #root{
        margin:0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @font-face {
        font-family: "Gilroy";
        src: local("GilroyBlack"), local("Gilroy-Black"),
          url(${GilroyBlackWoff2}) format("woff2"),
          url(${GilroyBlackWoff}) format("woff");
        font-weight: 800;
        font-style: normal;
    }
    @font-face {
        font-family: "Gilroy";
        src: local("GilroyHeavy"), local("Gilroy-Heavy"),
          url(${GilroyHeavyWoff2}) format("woff2"),
          url(${GilroyHeavyWoff}) format("woff");
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: "Gilroy";
        src: local("GilroyBold"), local("Gilroy-Bold"),
          url(${GilroyBoldWoff2}) format("woff2"),
          url(${GilroyBoldWoff}) format("woff");
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
      font-family: "Gilroy";
      src: local("GilroyMedium"), local("Gilroy-Medium"),
      url(${GilroyMediumWoff2}) format("woff2"),
      url(${GilroyMediumWoff}) format("woff");
      font-weight: 500;
      font-style: normal;
    }
    @font-face {
      font-family: "Gilroy";
      src: local("GilroyRegular"), local("Gilroy-Regular"),
      url(${GilroyRegularWoff2}) format("woff2"),
      url(${GilroyRegularWoff}) format("woff");
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
        font-family: "Gilroy";
        src: local("GilroyLight"), local("Gilroy-Light"),
          url(${GilroyLightWoff2}) format("woff2"),
          url(${GilroyLightWoff}) format("woff");
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: "Gilroy";
        src: local("GilroyThin"), local("Gilroy-Thin"),
          url(${GilroyThinWoff2}) format("woff2"),
          url(${GilroyThinWoff}) format("woff");
        font-weight: 100;
        font-style: normal;
    }
    `;
