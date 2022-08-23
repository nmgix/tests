describe("Проверка базовой функциональности приложения", () => {
  before(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.scrollTo("top");
  });

  it("Получение новых элементов при скролле", () => {
    cy.get('[class*="styles_asteroidsGrid"]').then((elems) => {
      const initialAsteroidsLength = elems.children().length;
      cy.scrollTo("bottom");
      cy.wait(8000);
      cy.get('[class*="styles_asteroidsGrid"]').children().should("have.length.above", initialAsteroidsLength);
    });
  });

  it("Рендер только опасных астероидов", () => {
    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .eq(0)
      .within(() =>
        cy
          .get('[class*="styles_asteroidInfo"]')
          .children()
          .eq(-1)
          .contains(/Не опасен|Опасен/)
      );

    cy.get('[class*="styles_controls"').get("label").contains("Показать только опасные").click();

    cy.wait(5000);

    cy.get('[class*="styles_asteroidsGrid"]')
      .children()
      .get('[style*="display: list-item"]')
      .each((elem) => {
        cy.wrap(elem).within(() => {
          cy.get('[class*="styles_asteroidInfo"]').children().eq(-1).should("include.text", "Опасен");
        });
      });
  });
});

export {};
