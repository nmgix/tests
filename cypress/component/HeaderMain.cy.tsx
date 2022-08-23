import { NextRouter } from "next/router";
import { useState } from "react";
import { ContextProvider } from "../../components/Common/Context";
import HeaderMain from "../../components/Header/Main";
import { ApodImage } from "../../types/apod";

const defaultImageApod: ApodImage = {
  title: "",
  date: "2022-07-07",
  explanation: "",
  url: "https://apod.nasa.gov/apod/image/2208/MeteorGalaxy_Looten_1000.jpg",
};
const defaultVideoApod: ApodImage = {
  title: "",
  date: "2022-07-07",
  explanation: "",
  url: "//www.youtube.com/embed/pQRM5CCHwfY",
  copyright: "",
  media_type: "video",
};

const Wrapper: React.FC = () => {
  const router = { pathname: "/" };
  const [apod, changeApod] = useState<ApodImage>(defaultImageApod);

  const changeApodData = () => {
    apod.media_type ? changeApod(defaultImageApod) : changeApod(defaultVideoApod);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeApodData()}>Change apod</button>
      </div>
      <HeaderMain data={apod} router={router as NextRouter} />
    </div>
  );
};

describe("HeaderMain", () => {
  before(() => {
    cy.viewport(1000, 500);
  });

  it("Получает изображение/видео и рендерит в зависимости от этого img/video", () => {
    cy.mount(
      <ContextProvider>
        <Wrapper />
      </ContextProvider>
    );

    cy.get('[class*="styles_adopWrapper"]')
      .children()
      .eq(0)
      .then((el) => {
        expect(el[0]).to.be.instanceOf(HTMLSpanElement);
      });

    cy.get("button").contains("Change apod").click();

    cy.get('[class*="styles_adopWrapper"]')
      .children()
      .eq(0)
      .then((el) => {
        expect(el[0]).to.be.instanceOf(HTMLIFrameElement);
      });
  });
});

export {};
