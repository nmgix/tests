import TodoElement, { TodoElementProps } from "./";
import { render, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

describe("TodoElement", () => {
  let exampleData: TodoElementProps;
  beforeEach(() => {
    exampleData = {
      id: "UUID-1",
      title: "Протестировать компонент TodoElement",
      completed: false,
      description: "Каждый юнит-тест необходим для проверки элементов",
    };
  });

  it('Изменение состояния "выполнено" при нажатии на Checkbox', () => {
    const { getByTestId } = render(<TodoElement {...exampleData} />);
    const checkbox = getByTestId("my-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});
