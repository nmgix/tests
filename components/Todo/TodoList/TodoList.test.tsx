import { TodoList } from "./TodoList";
import { render } from "@testing-library/react";
import { TodoElementProps } from "../TodoElement/TodoElement";
import { expect } from "@jest/globals";

describe("TodoList", () => {
  let exampleData: TodoElementProps[];
  beforeEach(() => {
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

  it("Должен отрисовать три элемента", () => {
    const { container } = render(<TodoList todos={exampleData} />);

    let list = container.querySelector("ul") as HTMLUListElement;

    expect(list.children.length).toBe(3);
  });
});
