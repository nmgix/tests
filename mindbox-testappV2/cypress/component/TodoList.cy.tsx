import React from "react";
import { TodoList } from "@/components/Todo/TodoList/TodoList";
import { TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { Provider } from "react-redux";
import store from "@/store/store";

describe("TodoList", () => {
  let exampleData: TodoElementProps[];
  beforeEach(() => {
    cy.viewport(1000, 500);
    exampleData = [
      {
        uuid: "uuid-1",
        completed: false,
        description: "Какое-то описание",
        title: "Заголовок заметки 1",
      },
      {
        uuid: "uuid-2",
        completed: true,
        description: "Какое-то странное",
        title: "Заголовок заметки 2",
      },
      {
        uuid: "uuid-3",
        completed: false,
        description: "Какое-то описание",
        title: "Заголовок заметки 3",
      },
    ];
  });

  it("Отрисовывает пять элементов в списке", () => {
    cy.mount(
      <Provider store={store}>
        <div style={{ width: "50%" }}>
          <TodoList />
        </div>
      </Provider>
    );
    cy.get("ul").find("li").should("have.length", 5);
  });

  it("После перетаскивания второй задачи наверх, первая и вторая задачи должны поменяться местами", () => {
    cy.mount(
      <Provider store={store}>
        <div style={{ width: "50%", boxSizing: "border-box" }}>
          <TodoList />
        </div>
      </Provider>
    );

    cy.get("ul").get("li").eq(0).find("div").first().as("firstHandle");

    cy.get("ul").get("li").eq(1).find("div").first().as("secondHandle");

    cy.get("@secondHandle").drag("@firstHandle");

    cy.get("ul").get("li").eq(0).find("h3").should("have.text", "Заголовок заметки 2");
  });
});
