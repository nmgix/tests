import { DndType, TodoElement, TodoElementProps } from "@/components/Todo/TodoElement/TodoElement";
import { useAppSelector } from "@/store/helpers";
import store from "@/store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";

describe("TodoElement", () => {
  beforeEach(() => {
    cy.viewport(1000, 500);
  });

  it('Изменение состояния "выполнено" при нажатии на Checkbox', () => {
    const Wrapper: React.FC = () => {
      const todoStore = useAppSelector((state) => state.todos);
      return (
        <div style={{ boxSizing: "border-box" }}>
          <TodoElement {...todoStore.todos[0]} index={0} moveCardHandler={() => {}} />;
        </div>
      );
    };

    cy.mount(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Wrapper />
        </DndProvider>
      </Provider>
    );
    let checkbox = cy.get("li").find("input[type=checkbox]");
    checkbox.click();
    checkbox.should("be.checked");
  });
});
