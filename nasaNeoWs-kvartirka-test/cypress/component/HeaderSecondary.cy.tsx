import { ContextProvider } from "../../components/Common/Context";
import AsteroidIcon from "../../components/CustomIcons/AsteroidIcon/AsteroidIcon";
import HeaderSecondaryWrapper from "../../components/Header/Secondary";

describe("HeaderSecondary", () => {
  beforeEach(() => {
    cy.viewport(1000, 500);
  });

  it("Рендерится обычный заголовок", () => {
    cy.mount(
      <ContextProvider>
        <HeaderSecondaryWrapper title='Ближайшие подлёты' />
      </ContextProvider>
    );

    cy.get('[class*="styles_title"]').children().get("h2").should("contain", "Ближайшие подлёты");

    cy.get('[class*="styles_controls"]').children().get('[class*="styles_metricsSwitch"]').should("exist");
    cy.get('[class*="styles_controls"]').children().get('[class*="tyles_hazardousSwitch"]').should("exist");
  });

  it("Рендерится заголовок для страницы астероида (с иконкой, датой и без выбора showHazardous)", () => {
    cy.mount(
      <ContextProvider>
        <HeaderSecondaryWrapper
          title='Астероид (2022-07-07)'
          withDate={new Date()}
          withIcon={<AsteroidIcon hazardous={false} />}
          withoutHazardous={true}
        />
      </ContextProvider>
    );

    cy.get('[class*="styles_laptopWithIcon"]').children().get('[class*="styles_asteroidIcon"]').should("exist");
    cy.get('[class*="styles_title"]').children().get("h2").should("contain", "Астероид (2022-07-07)");
    cy.get('[class*="styles_title"]').children().get("time").should("exist");
    cy.get('[class*="styles_controls"]').children().get('[class*="tyles_hazardousSwitch"]').should("not.exist");
  });

  it("При ширине экрана больше 524px рендерится одна разметка HeaderSecondary с иконкой, при ширине меньше - другая", () => {
    cy.mount(
      <ContextProvider>
        <HeaderSecondaryWrapper title='Астероид (2022-07-07)' withIcon={<AsteroidIcon hazardous={false} />} />
      </ContextProvider>
    );

    cy.get('[class*="styles_mobileWithIcon"]').should("not.be.visible");

    cy.viewport(500, 500);

    cy.get('[class*="styles_laptopWithIcon"]').should("not.be.visible");
  });
});

export {};
