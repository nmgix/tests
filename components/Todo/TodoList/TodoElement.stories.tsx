import { TodoList as Component } from "./TodoList";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TodoElementProps } from "../TodoElement/TodoElement";

export default {
  title: "Todo",
  component: Component,
} as ComponentMeta<typeof Component>;

const GenericTodoList: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const TodoList = GenericTodoList.bind({});

const mockData: TodoElementProps[] = [
  {
    id: "uuid-1",
    completed: false,
    description: "Какое-то описание",
    title: "Заголовок заметки 1",
  },
  {
    id: "uuid-2",
    completed: false,
    description:
      "Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание. Какое-то описание.",
    title: "Заголовок заметки 2",
  },
  {
    id: "uuid-3",
    completed: false,
    description: "Какое-то описание",
    title: "Заголовок заметки 3",
  },
  {
    id: "uuid-4",
    completed: false,
    description: "Какое-то описание",
    title: "Заголовок заметки 4",
  },
  {
    id: "uuid-5",
    completed: false,
    description: "Какое-то описание",
    title: "Заголовок заметки 5",
  },
];

TodoList.args = {
  todos: mockData,
};
