import { useState } from "react";
import AsteroidCard, { AsteroidCardProps } from "../../components/AsteroidCard";
import { ContextProvider, useAsteroidContext } from "../../components/Common/Context";

type OmittedAsteroidCardProps = Omit<AsteroidCardProps, "is_potentially_hazardous_asteroid" | "selecetedMetric" | "id">;

const defaultProps: OmittedAsteroidCardProps = {
  addAsteroid: () => {},
  designation: "",
  estimated_diameter: { kilometers: { estimated_diameter_max: 0, estimated_diameter_min: 0 } },
  links: {
    self: "",
  },
  name: "Default asteroid",
  ordered: false,
  removeAsteroid: () => {},
  close_approach_data: [
    {
      close_approach_date: "2022-07-07",
      close_approach_date_full: "2022-07-07",
      miss_distance: {
        kilometers: "10000000",
        lunar: "10",
      },
      orbiting_body: "Earth",
      relative_velocity: {
        kilometers_per_hour: "100",
      },
    },
  ],
  nodeENV: "development",
};

const Wrapper: React.FC<OmittedAsteroidCardProps & { defaultHazardous?: boolean }> = (props) => {
  const { selecetedMetric, changeMetric } = useAsteroidContext();

  const [isHazardous, changeHazardous] = useState<boolean>(props.defaultHazardous ? props.defaultHazardous : false);
  const [id, setId] = useState<number>(1);

  const handleHazardous = () => {
    changeHazardous((prev) => !prev);
    setId((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <div>
      <div>
        <button onClick={() => handleHazardous()}>Change hazardous state</button>
        <button onClick={() => changeMetric(selecetedMetric === "kiloMeters" ? "lunar" : "kiloMeters")}>
          Change metrics
        </button>
      </div>
      <AsteroidCard
        {...props}
        id={id.toString()}
        is_potentially_hazardous_asteroid={isHazardous}
        selecetedMetric={selecetedMetric}
      />
    </div>
  );
};

describe("AsteroidCard", () => {
  before(() => {
    cy.viewport(1000, 500);
  });

  it('При "is_potentially_hazardous_asteroid" === true, в карточке должно быть написано "Опасен" и "Не опасен" при обратных условиях', () => {
    cy.mount(
      <ContextProvider>
        <Wrapper {...defaultProps} defaultHazardous={true} />
      </ContextProvider>
    );

    cy.get('[class*="styles_asteroidInfo"]').children().eq(-1).should("include.text", "Опасен");

    cy.get("button").contains("Change hazardous state").click();

    cy.get('[class*="styles_asteroidInfo"]').children().eq(-1).should("include.text", "Не опасен");
  });

  it('Фон в иконке при "is_potentially_hazardous_asteroid" === false должен быть цвета светло-зелёного градиента, альтернативно светло-красного', () => {
    cy.mount(
      <ContextProvider>
        <Wrapper {...defaultProps} />
      </ContextProvider>
    );
    cy.get('[class*="styles_asteroidIcon"]').then((el) =>
      expect(el[0].style.background).to.be.eql("linear-gradient(90deg, rgb(207, 243, 125) 0%, rgb(125, 232, 140) 100%)")
    );

    cy.get("button").contains("Change hazardous state").click();

    cy.get('[class*="styles_asteroidIcon"]').then((el) =>
      expect(el[0].style.background).to.be.eql("linear-gradient(90deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)")
    );
  });

  it("Меняется метрика расстояния при измении оной в контексте", () => {
    cy.mount(
      <ContextProvider>
        <Wrapper {...defaultProps} />
      </ContextProvider>
    );

    cy.get('[class*="styles_asteroidInfo"]').children().eq(4).should("include.text", "км");

    cy.get("button").contains("Change metrics").click();

    cy.get('[class*="styles_asteroidInfo"]').children().eq(4).should("include.text", "лунных орбит");
  });
});

export {};
