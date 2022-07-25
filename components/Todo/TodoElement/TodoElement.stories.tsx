import TodoElement from "./index";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Todo/TodoElement",
  component: TodoElement,
} as ComponentMeta<typeof TodoElement>;

const GenericTodoElement: ComponentStory<typeof TodoElement> = (args) => <TodoElement {...args} />;

export const DefaultTodoElement = GenericTodoElement.bind({});

DefaultTodoElement.args = {
  id: "UUID-1",
  title: "Протестировать компонент TodoElement",
  completed: false,
  description: "Каждый юнит-тест необходим для проверки элементов",
};
