import { TodoElement as Component } from "./TodoElement";
import { ComponentStory, ComponentMeta, configure } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppSelector } from "@/store/helpers";

export default {
  title: "Todo",
  component: Component,
} as ComponentMeta<typeof Component>;

const Wrapper: React.FC = () => {
  const todoStore = useAppSelector((state) => state.todos);
  return (
    <div style={{ width: "50%", boxSizing: "border-box" }}>
      <Component {...todoStore.todos[0]} index={0} moveCardHandler={() => {}} />;
    </div>
  );
};

const GenericTodoElement: ComponentStory<typeof Component> = () => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <Wrapper />
    </DndProvider>
  </Provider>
);

export const TodoElement = GenericTodoElement.bind({});
