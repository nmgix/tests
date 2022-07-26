import { DndType, TodoElement, TodoElementProps } from "./TodoElement";
import { render, fireEvent } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { expect } from "@jest/globals";

describe("TodoElement", () => {
  let exampleData: TodoElementProps & DndType;
  beforeEach(() => {
    exampleData = {
      id: "UUID-1",
      title: "Протестировать компонент TodoElement",
      completed: false,
      description: "Каждый юнит-тест необходим для проверки элементов",
      index: 0,
      moveCardHandler: () => {},
      setState: () => {},
    };
  });

  it('Изменение состояния "выполнено" при нажатии на Checkbox', () => {
    const { container } = render(
      <DndProvider backend={HTML5Backend}>
        <TodoElement {...exampleData} />
      </DndProvider>
    );
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
