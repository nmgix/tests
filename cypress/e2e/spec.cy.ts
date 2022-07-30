describe("Проверка базового поведения проекта", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
  });

  it("Проверка изначального состояния", () => {
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 5);
  });

  it("Проверка добавления и удаления туду, проверка модального окна", () => {
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 5);

    cy.get("button").contains("Add new todo").click();
    cy.get("input[name='title']")
      .type("Example New Todo")
      .should("have.value", "Example New Todo")
      .get("input[name='description']")
      .type("Description for new todo")
      .should("have.value", "Description for new todo")
      .get("form")
      .submit();
    cy.get("h3").contains("Example New Todo").should("be.visible");

    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 6);

    // cy.get('[class*="todoElement_todoElement"]').eq(5).get("input[type=checkbox]").check(); находит все элементы и все отмечает
    cy.get('[class*="todoElement_todoElement"]')
      .eq(5)
      .within(() => {
        cy.get('[type="checkbox"]').check();
      });

    cy.get("button").contains("Delete completed todos").click();
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 5);

    cy.get("button").contains("Delete all todos").click();

    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 0);
  });

  it("Проверка кнопок фильтра", () => {
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 5);

    cy.get('[class*="todoElement_todoElement"]')
      .eq(0)
      .within(() => {
        cy.get('[type="checkbox"]').check();
      });

    cy.get("button").contains("4 active").click();
    cy.get('[class*="todoList_todoList"]').children().should("have.length", 4);

    cy.get("button").contains("1 completed").click();
    cy.get('[class*="todoList_todoList"]').children().should("have.length", 1);
  });

  it('Проверка поведения общего "навбара" при изменении кол-ва туду', () => {
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 5);

    cy.get("button").contains("0 completed").should("exist");
    cy.get("button").contains("5 active").should("exist");
    cy.get("button").contains("5 total").should("exist");
    cy.get("button").contains("Delete completed todos").should("exist");
    cy.get("button").contains("Delete all todos").should("exist");
    cy.get('[class*="home_container"]').get('[class*="home_addTodo"]').should("have.length", 2);

    cy.get("button").contains("Delete all todos").click();
    cy.window().its("store").invoke("getState").its("todos").its("todos").should("have.length", 0);

    cy.get("button").contains("0 completed").should("not.exist");
    cy.get("button").contains("0 active").should("not.exist");
    cy.get("button").contains("0 total").should("not.exist");
    cy.get("button").contains("Delete completed todos").should("not.exist");
    cy.get("button").contains("Delete all todos").should("not.exist");

    cy.get('[class*="home_container"]').get('[class*="home_addTodo"]').should("have.length", 1);

    cy.get("button").contains("Add new todo").click();
    cy.get("input[name='title']")
      .type("Example New Todo")
      .should("have.value", "Example New Todo")
      .get("input[name='description']")
      .type("Description for new todo")
      .should("have.value", "Description for new todo")
      .get("form")
      .submit();
    cy.get("h3").contains("Example New Todo").should("be.visible");

    cy.get("button").contains("0 completed").should("exist");
    cy.get("button").contains("1 active").should("exist");
    cy.get("button").contains("1 total").should("exist");
    cy.get("button").contains("Delete completed todos").should("exist");
    cy.get("button").contains("Delete all todos").should("exist");
    cy.get('[class*="home_container"]').get('[class*="home_addTodo"]').should("have.length", 2);
  });
});

export {};
