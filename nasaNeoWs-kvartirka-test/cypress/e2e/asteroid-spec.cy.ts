describe("Проверка связки localStorage и страницы", () => {
  before(() => {
    cy.viewport(1280, 720);
    cy.visit("/asteroids/3989235");
  });

  it('У безопасного астероида должна быть "безопасная" иконка', () => {
    cy.get('[class*="styles_asteroidIcon"]').then((el) =>
      expect(el[0].style.background).to.be.eql("linear-gradient(90deg, rgb(207, 243, 125) 0%, rgb(125, 232, 140) 100%)")
    );
  });

  //   it("Проверка работы добавления/удаления из заказа", () => {
  //     cy.get('[class*="asteroid_buttonWrapper"]').within(() => {
  //       let button = cy.get("button");
  //       button.should("contain.text", "Уничтожить");
  //       button.click();
  //       button.should("contain.text", "Удалить из заказа");
  //       button.click();
  //       button.should("contain.text", "Уничтожить");
  //     });
  //   });

  it("Смена отображения расстояния меняет отображение и в характеристиках, и в списке сближений", () => {
    cy.get('[class*="asteroid_characteristics"]').within(() => {
      cy.get("li")
        .contains(/Расстояние до земли/)
        .contains(/км/);
    });
    cy.get('[class*="asteroid_tableData"]').within(() => {
      cy.get("td")
        .contains(/лунных орбит/)
        .should("have.length", 0);
    });

    cy.get('[class*="styles_controls"]').within(() => {
      cy.get("button").contains("в лунных орбитах").click({ force: true });
    });

    cy.get('[class*="asteroid_characteristics"]').within(() => {
      cy.get("li")
        .contains(/Расстояние до земли/)
        .contains(/лунных орбит/);
    });
    cy.get('[class*="asteroid_tableData"]').within(() => {
      cy.get("td").contains(/км$/).should("have.length", 0);
    });
  });
});

export {};
