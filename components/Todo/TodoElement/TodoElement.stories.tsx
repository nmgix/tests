import { TodoElement as Component } from "./TodoElement";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default {
  title: "Todo",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericTodoElement: ComponentStory<typeof Component> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Component {...args} />
  </DndProvider>
);

export const TodoElement = GenericTodoElement.bind({});

TodoElement.args = {
  id: "UUID-1",
  title: "Протестировать компонент TodoElement",
  completed: false,
  description: "Каждый юнит-тест необходим для проверки элементов",
  index: 0,
  moveCardHandler: () => {},
  setState: () => {},
};
