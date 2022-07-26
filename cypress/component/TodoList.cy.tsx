import React from "react";
import { TodoList } from "@/components/Todo/TodoList/TodoList";
import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";

describe("TodoList", () => {
  let exampleData: TodoElementProps[];
  beforeEach(() => {
    cy.viewport(1000, 500);
    exampleData = [
      {
        id: "uuid-1",
        completed: false,
        description: "Какое-то описание",
        title: "Заголовок заметки 1",
      },
      {
        id: "uuid-2",
        completed: true,
        description: "Какое-то странное",
        title: "Заголовок заметки 2",
      },
      {
        id: "uuid-3",
        completed: false,
        description: "Какое-то описание",
        title: "Заголовок заметки 3",
      },
    ];
  });

  it("Отрисовывает три элемента в списке", () => {
    cy.mount(<TodoList todos={exampleData} />);
    cy.get("ul").find("li").should("have.length", 3);
  });

  it("После перетаскивания второй задачи наверх, первая и вторая задачи должны поменяться местами", () => {
    cy.mount(<TodoList todos={exampleData} />);

    cy.get("#uuid-2").drag("#uuid-1");

    cy.get("ul").get("li").eq(0).find("div").first().should("have.id", "uuid-2");
    cy.get("ul").get("li").eq(1).find("div").first().should("have.id", "uuid-1");
  });
});
