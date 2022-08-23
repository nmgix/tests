describe("Проверка заказа", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "asteroid-order",
      JSON.stringify(["3477703", "3675229", "3989235", "3750677", "3729233"])
    );
    cy.viewport(1280, 720);
    cy.visit("/order");
  });

  it("Парс элементов со списка", () => {});

  it("Удаление элемента из списка", () => {});

  it("Отправка бригады им. Брюса Уиллиса", () => {});
});

export {};

export {};
